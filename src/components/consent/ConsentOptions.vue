<script setup lang="ts">
import { ref, reactive, toRef, defineProps, defineEmits, computed } from 'vue'

// 定义组件的属性
const props = defineProps({
  consentOptions: {
    type: Object,
    required: true,
  },
})

// 定义更新事件
const emit = defineEmits(['update:consentOptions'])

// 创建本地可变引用
const consentOptions = toRef(props, 'consentOptions')

// 预设的具体同意选项 - 更换为常见亲密行为
const predefinedSpecificConsent = [
  { id: 1, text: '我同意双方之间的接吻行为', checked: false },
  { id: 2, text: '我同意双方之间的拥抱和爱抚行为', checked: false },
  { id: 3, text: '我同意双方之间的口头亲密行为', checked: false },
  { id: 4, text: '我同意双方之间的性交行为', checked: false },
  { id: 5, text: '我同意使用安全套等避孕措施', checked: false },
  { id: 6, text: '我同意拍摄亲密照片或视频', checked: false },
  { id: 7, text: '我知晓并接受相关的健康安全措施', checked: false },
]

// 初始化特定同意选项（如果为空）
if (consentOptions.value.specificConsent.length === 0) {
  const newOptions = { ...consentOptions.value }
  newOptions.specificConsent = [...predefinedSpecificConsent]
  emit('update:consentOptions', newOptions)
}

// 新增自定义选项
const newOptionText = ref('')
const addCustomOption = () => {
  if (newOptionText.value.trim()) {
    const newOptions = { ...consentOptions.value }
    const newId =
      newOptions.specificConsent.length > 0
        ? Math.max(...newOptions.specificConsent.map((item) => item.id)) + 1
        : 1

    newOptions.specificConsent.push({
      id: newId,
      text: newOptionText.value.trim(),
      checked: true,
    })

    emit('update:consentOptions', newOptions)
    newOptionText.value = ''
  }
}

// 更新基础同意选项
const updateBasicConsent = (id, checked) => {
  const newOptions = { ...consentOptions.value }
  const index = newOptions.basicConsent.findIndex((item) => item.id === id)

  if (index !== -1) {
    newOptions.basicConsent[index].checked = checked
    emit('update:consentOptions', newOptions)
  }
}

// 更新特定同意选项
const updateSpecificConsent = (id, checked) => {
  const newOptions = { ...consentOptions.value }
  const index = newOptions.specificConsent.findIndex((item) => item.id === id)

  if (index !== -1) {
    newOptions.specificConsent[index].checked = checked
    emit('update:consentOptions', newOptions)
  }
}

// 删除特定同意选项
const removeSpecificOption = (id) => {
  const newOptions = { ...consentOptions.value }
  newOptions.specificConsent = newOptions.specificConsent.filter((item) => item.id !== id)
  emit('update:consentOptions', newOptions)
}

// 更新补充条款
const updateAdditionalTerms = (value) => {
  const newOptions = { ...consentOptions.value, additionalTerms: value }
  emit('update:consentOptions', newOptions)
}

// 获取当前日期
const getCurrentDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 本地时间范围
const timeRangeDate = ref(getCurrentDate())

// 格式化日期为中文显示
const formattedTimeRange = computed(() => {
  if (!timeRangeDate.value) return ''
  const date = new Date(timeRangeDate.value)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
})

// 新增特定同意选项
const newSpecificOption = ref('')
const addSpecificOption = () => {
  if (newSpecificOption.value.trim()) {
    const newId =
      consentOptions.value.specificConsent.length > 0
        ? Math.max(...consentOptions.value.specificConsent.map((item) => item.id)) + 1
        : 1

    consentOptions.value.specificConsent.push({
      id: newId,
      text: newSpecificOption.value.trim(),
      checked: true,
    })
    newSpecificOption.value = ''
    updateParent()
  }
}

// 更新父组件数据
const updateParent = () => {
  emit('update:consentOptions', {
    basicConsent: consentOptions.value.basicConsent,
    specificConsent: consentOptions.value.specificConsent,
    additionalTerms: consentOptions.value.additionalTerms,
    timeRange: formattedTimeRange.value,
  })
}

// 监听变化
const handleChange = () => {
  updateParent()
}
</script>

<template>
  <div class="consent-options">
    <h2>同意选项</h2>
    <p class="options-intro">请仔细阅读下列选项，勾选您同意的内容</p>

    <div class="options-section">
      <h3>基本同意声明</h3>
      <p class="section-note">以下基本声明为必选项</p>

      <div class="option-item" v-for="item in consentOptions.basicConsent" :key="item.id">
        <label class="checkbox-label">
          <input
            type="checkbox"
            :checked="item.checked"
            :disabled="true"
            @change="updateBasicConsent(item.id, $event.target.checked)"
          />
          <span class="checkbox-text">{{ item.text }}</span>
        </label>
      </div>
    </div>

    <div class="options-section">
      <h3>具体同意事项</h3>
      <p class="section-note">请选择您同意的具体亲密行为</p>

      <div class="option-item" v-for="item in consentOptions.specificConsent" :key="item.id">
        <label class="checkbox-label">
          <input
            type="checkbox"
            :checked="item.checked"
            @change="updateSpecificConsent(item.id, $event.target.checked)"
          />
          <span class="checkbox-text">{{ item.text }}</span>
        </label>
        <button @click="removeSpecificOption(item.id)" class="remove-btn" title="删除此选项">
          ×
        </button>
      </div>

      <div class="add-custom-option">
        <input
          type="text"
          v-model="newOptionText"
          placeholder="添加自定义同意选项"
          @keyup.enter="addCustomOption"
        />
        <button @click="addCustomOption" class="add-btn">添加</button>
      </div>
    </div>

    <div class="options-section">
      <h3>同意有效时间</h3>
      <p class="time-range-note">设置此同意书的有效日期，默认为今天</p>
      <div class="time-range-input">
        <input type="date" v-model="timeRangeDate" @change="handleChange" />
        <span class="time-range-preview">将显示为: {{ formattedTimeRange }}</span>
      </div>
    </div>

    <div class="options-section">
      <h3>补充条款</h3>
      <p class="section-note">可以在下方添加双方约定的其他补充条款</p>

      <textarea
        v-model="consentOptions.additionalTerms"
        @input="updateAdditionalTerms($event.target.value)"
        placeholder="在此输入双方约定的其他条款内容..."
        rows="4"
      ></textarea>
    </div>

    <div class="legal-reminder">
      <h4>撤回权利声明</h4>
      <p>您有权在任何时候撤回同意，该同意书不是永久性的法律约束。</p>
      <p><strong>重要提示：</strong> 每个人对亲密行为都有自己的界限，请尊重对方的选择和感受。</p>
    </div>
  </div>
</template>

<style scoped>
.consent-options {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  text-align: center;
  margin-bottom: 5px;
  color: #333;
}

.options-intro {
  text-align: center;
  margin-bottom: 20px;
  color: #666;
  font-size: 0.9em;
}

.options-section {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #3498db;
  font-size: 1.2em;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.section-note {
  margin-top: 0;
  margin-bottom: 15px;
  color: #666;
  font-size: 0.9em;
  font-style: italic;
}

.option-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  position: relative;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  width: 100%;
}

.checkbox-text {
  margin-left: 10px;
  line-height: 1.4;
}

.remove-btn {
  background-color: transparent;
  color: #e74c3c;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 50%;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: #f8d7da;
}

.add-custom-option {
  display: flex;
  margin-top: 15px;
  gap: 10px;
}

.add-custom-option input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.add-btn {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.legal-reminder {
  background-color: #f8f9fa;
  border-left: 4px solid #f39c12;
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 0 4px 4px 0;
}

.legal-reminder h4 {
  margin-top: 0;
  margin-bottom: 5px;
  color: #f39c12;
}

.legal-reminder p {
  margin: 0;
  color: #555;
  margin-bottom: 8px;
}

.legal-reminder p:last-child {
  margin-bottom: 0;
}

@media (max-width: 480px) {
  .add-custom-option {
    flex-direction: column;
  }

  .add-btn {
    align-self: flex-end;
  }
}

/* 时间范围样式 */
.time-range-note {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.time-range-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.time-range-input input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 200px;
}

.time-range-preview {
  font-size: 0.9rem;
  color: #3498db;
}

@media (max-width: 480px) {
  .add-custom-option {
    flex-direction: column;
  }

  .add-btn {
    align-self: flex-start;
  }
}
</style>
