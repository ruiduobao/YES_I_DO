<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

// 定义组件的属性
const props = defineProps({
  identities: {
    type: Object,
    required: true,
  },
  metadata: {
    type: Object,
    required: true,
  },
})

// 定义更新事件
const emit = defineEmits(['update:identities', 'update:metadata'])

// 本地数据
const localIdentities = ref({
  person1: {
    name: props.identities.person1?.name || '',
    contact: props.identities.person1?.contact || '',
    idType: props.identities.person1?.idType || '',
    idNumber: props.identities.person1?.idNumber || '',
  },
  person2: {
    name: props.identities.person2?.name || '',
    contact: props.identities.person2?.contact || '',
    idType: props.identities.person2?.idType || '',
    idNumber: props.identities.person2?.idNumber || '',
  },
})

const localMetadata = ref({
  date: props.metadata?.date || new Date().toLocaleString(),
  location: props.metadata?.location || '',
  useLocation: props.metadata?.useLocation || false,
})

// 身份证件类型选项
const idTypeOptions = ['身份证', '护照', '驾驶证', '其他证件']

// 获取地理位置
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 实际应用中，你可能需要使用地理编码API来获取地址
        // 这里仅简单展示经纬度
        localMetadata.value.location = `位置: ${position.coords.latitude.toFixed(
          4,
        )}, ${position.coords.longitude.toFixed(4)}`
        updateMetadata()
      },
      (error) => {
        console.error('无法获取位置信息:', error)
        alert('无法获取位置信息，请手动输入。')
        localMetadata.value.useLocation = false
        updateMetadata()
      },
    )
  } else {
    alert('您的浏览器不支持地理定位。')
    localMetadata.value.useLocation = false
    updateMetadata()
  }
}

// 监听地理位置开关
watch(
  () => localMetadata.value.useLocation,
  (newVal) => {
    if (newVal) {
      getLocation()
    } else {
      localMetadata.value.location = ''
      updateMetadata()
    }
  },
)

// 更新身份信息
const updateIdentities = () => {
  emit('update:identities', { ...localIdentities.value })
}

// 更新元数据
const updateMetadata = () => {
  emit('update:metadata', { ...localMetadata.value })
}
</script>

<template>
  <div class="consent-form">
    <h2>参与方信息</h2>
    <p class="section-description">填写同意书参与方的基本信息</p>

    <div class="person-forms">
      <div class="person-form">
        <h3>甲方信息</h3>
        <div class="form-group">
          <label for="person1-name">姓名 <span class="required">*</span></label>
          <input
            id="person1-name"
            type="text"
            v-model="localIdentities.person1.name"
            @change="updateIdentities"
            required
            placeholder="输入姓名"
          />
        </div>

        <div class="form-group">
          <label for="person1-contact">联系方式 <span class="optional">(可选)</span></label>
          <input
            id="person1-contact"
            type="text"
            v-model="localIdentities.person1.contact"
            @change="updateIdentities"
            placeholder="输入手机号或其他联系方式"
          />
        </div>

        <div class="form-group">
          <label for="person1-id-type">证件类型 <span class="optional">(可选)</span></label>
          <select
            id="person1-id-type"
            v-model="localIdentities.person1.idType"
            @change="updateIdentities"
          >
            <option value="">请选择证件类型</option>
            <option v-for="type in idTypeOptions" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div class="form-group" v-if="localIdentities.person1.idType">
          <label for="person1-id-number">证件号码 <span class="optional">(可选)</span></label>
          <input
            id="person1-id-number"
            type="text"
            v-model="localIdentities.person1.idNumber"
            @change="updateIdentities"
            placeholder="输入证件号码"
          />
        </div>
      </div>

      <div class="person-form">
        <h3>乙方信息</h3>
        <div class="form-group">
          <label for="person2-name">姓名 <span class="required">*</span></label>
          <input
            id="person2-name"
            type="text"
            v-model="localIdentities.person2.name"
            @change="updateIdentities"
            required
            placeholder="输入姓名"
          />
        </div>

        <div class="form-group">
          <label for="person2-contact">联系方式 <span class="optional">(可选)</span></label>
          <input
            id="person2-contact"
            type="text"
            v-model="localIdentities.person2.contact"
            @change="updateIdentities"
            placeholder="输入手机号或其他联系方式"
          />
        </div>

        <div class="form-group">
          <label for="person2-id-type">证件类型 <span class="optional">(可选)</span></label>
          <select
            id="person2-id-type"
            v-model="localIdentities.person2.idType"
            @change="updateIdentities"
          >
            <option value="">请选择证件类型</option>
            <option v-for="type in idTypeOptions" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div class="form-group" v-if="localIdentities.person2.idType">
          <label for="person2-id-number">证件号码 <span class="optional">(可选)</span></label>
          <input
            id="person2-id-number"
            type="text"
            v-model="localIdentities.person2.idNumber"
            @change="updateIdentities"
            placeholder="输入证件号码"
          />
        </div>
      </div>
    </div>

    <div class="metadata-section">
      <h3>地点信息</h3>
      <div class="form-group location-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="localMetadata.useLocation" />
          使用当前地理位置
        </label>
        <div v-if="!localMetadata.useLocation" class="manual-location">
          <label for="location">地点 <span class="optional">(可选)</span></label>
          <input
            id="location"
            type="text"
            v-model="localMetadata.location"
            @change="updateMetadata"
            placeholder="输入地点"
          />
        </div>
        <p v-else class="location-display">
          {{ localMetadata.location || '正在获取位置...' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.consent-form {
  margin-bottom: 30px;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.section-description {
  color: #666;
  margin-bottom: 20px;
}

.person-forms {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

@media (min-width: 768px) {
  .person-forms {
    flex-direction: row;
    gap: 20px;
  }

  .person-form {
    flex: 1;
  }
}

.person-form {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h3 {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.required {
  color: #e74c3c;
}

.optional {
  color: #7f8c8d;
  font-weight: normal;
  font-size: 0.9em;
}

.metadata-section {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.location-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-label input {
  width: auto;
}

.manual-location {
  margin-top: 10px;
}

.location-display {
  padding: 10px;
  background-color: #eee;
  border-radius: 4px;
  font-style: italic;
}
</style>
