<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import ConsentForm from '../components/consent/ConsentForm.vue'
import ConsentOptions from '../components/consent/ConsentOptions.vue'
import ConsentSignature from '../components/consent/ConsentSignature.vue'
import ConsentPreview from '../components/consent/ConsentPreview.vue'
import LegalNotice from '../components/consent/LegalNotice.vue'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = 4

// 获取当前日期的格式化字符串
const getCurrentDateString = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日`
}

// 存储表单数据
const formData = reactive({
  // 身份信息
  identities: {
    person1: {
      name: '',
      contact: '',
      idType: '',
      idNumber: '',
    },
    person2: {
      name: '',
      contact: '',
      idType: '',
      idNumber: '',
    },
  },
  // 日期和地理位置
  metadata: {
    date: new Date().toLocaleString(),
    location: '',
    useLocation: false,
    timeRange: getCurrentDateString(), // 添加时间范围，默认为当天
  },
  // 同意选项
  consentOptions: {
    basicConsent: [
      { id: 1, text: '我确认我已达到法定成年年龄', checked: true },
      { id: 2, text: '我确认此行为是在完全自愿的情况下进行的', checked: true },
      { id: 3, text: '我确认我在签署本同意书时意识清醒，没有受到酒精或药物的影响', checked: true },
    ],
    specificConsent: [],
    additionalTerms: '',
    timeRange: getCurrentDateString(), // 添加时间范围
  },
  // 签名数据
  signatures: {
    person1: '',
    person2: '',
    person1Time: '',
    person2Time: '',
  },
})

// 尝试从localStorage加载数据
try {
  const savedData = localStorage.getItem('consentData')
  if (savedData) {
    const parsedData = JSON.parse(savedData)
    if (parsedData.identities) formData.identities = parsedData.identities
    if (parsedData.metadata) {
      formData.metadata = parsedData.metadata
      // 如果没有时间范围，设置为当天
      if (!formData.metadata.timeRange) {
        formData.metadata.timeRange = getCurrentDateString()
      }
    }
    if (parsedData.consentOptions) {
      formData.consentOptions = parsedData.consentOptions
      // 如果没有时间范围，设置为当天
      if (!formData.consentOptions.timeRange) {
        formData.consentOptions.timeRange = getCurrentDateString()
      }
    }
    if (parsedData.signatures) formData.signatures = parsedData.signatures
  }
} catch (error) {
  console.error('无法加载保存的数据:', error)
}

// 监听数据变化，保存到localStorage
watch(
  formData,
  () => {
    try {
      localStorage.setItem('consentData', JSON.stringify(formData))
    } catch (error) {
      console.error('保存数据失败:', error)
    }
  },
  { deep: true },
)

// 下一步
const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

// 上一步
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// 完成并导出
const finishAndExport = () => {
  // 保存最终数据到localStorage
  try {
    localStorage.setItem('consentData', JSON.stringify(formData))
  } catch (error) {
    console.error('保存数据失败:', error)
  }
  // 跳转到预览/导出页面
  router.push({ name: 'export', params: { id: new Date().getTime().toString() } })
}

// 计算当前显示的组件
const currentComponent = computed(() => {
  switch (currentStep.value) {
    case 1:
      return 'consent-form'
    case 2:
      return 'consent-options'
    case 3:
      return 'consent-signature'
    case 4:
      return 'consent-preview'
    default:
      return 'consent-form'
  }
})
</script>

<template>
  <div class="consent-app">
    <!-- 步骤指示器 -->
    <div class="steps-indicator">
      <div
        v-for="step in totalSteps"
        :key="step"
        :class="['step', { active: step === currentStep, completed: step < currentStep }]"
      >
        {{ step }}
      </div>
    </div>

    <!-- 步骤内容 -->
    <div class="step-content">
      <ConsentForm
        v-if="currentComponent === 'consent-form'"
        v-model:identities="formData.identities"
        v-model:metadata="formData.metadata"
      />

      <ConsentOptions
        v-if="currentComponent === 'consent-options'"
        v-model:consentOptions="formData.consentOptions"
      />

      <ConsentSignature
        v-if="currentComponent === 'consent-signature'"
        v-model:signatures="formData.signatures"
        :identities="formData.identities"
      />

      <ConsentPreview v-if="currentComponent === 'consent-preview'" :formData="formData" />
    </div>

    <!-- 法律提示 -->
    <LegalNotice />

    <!-- 导航按钮 -->
    <div class="navigation-buttons">
      <button v-if="currentStep > 1" @click="prevStep" class="prev-btn">上一步</button>

      <button v-if="currentStep < totalSteps" @click="nextStep" class="next-btn">下一步</button>

      <button v-if="currentStep === totalSteps" @click="finishAndExport" class="export-btn">
        导出同意书
      </button>
    </div>
  </div>
</template>

<style scoped>
.consent-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.steps-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.step {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.step.active {
  background-color: #3498db;
  color: white;
}

.step.completed {
  background-color: #2ecc71;
  color: white;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  height: 2px;
  background-color: #eee;
  width: calc(100% - 40px);
  left: 35px;
  top: 15px;
  z-index: -1;
}

.step.completed:not(:last-child)::after {
  background-color: #2ecc71;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.prev-btn {
  background-color: #f1f1f1;
  color: #333;
}

.next-btn {
  background-color: #3498db;
  color: white;
}

.export-btn {
  background-color: #e74c3c;
  color: white;
}

@media (max-width: 480px) {
  .consent-app {
    padding: 10px;
  }

  button {
    padding: 8px 15px;
    font-size: 14px;
  }
}
</style>
