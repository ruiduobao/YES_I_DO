<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 导入导出工具
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const route = useRoute()
const router = useRouter()
const consentId = ref(route.params.id as string)
const isExporting = ref(false)

// 获取当前日期的格式化字符串
const getCurrentDateString = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日`
}

// 模拟从本地存储获取同意书数据
// 在实际应用中，你可能需要从localStorage或其他存储中获取数据
const consentData = ref({
  identities: {
    person1: {
      name: '张三',
      contact: '13800000000',
      idType: '身份证',
      idNumber: '310000000000000000',
    },
    person2: {
      name: '李四',
      contact: '13900000000',
      idType: '身份证',
      idNumber: '320000000000000000',
    },
  },
  metadata: {
    date: new Date().toLocaleString(),
    location: '上海市',
    timeRange: getCurrentDateString(), // 添加时间范围，默认为当天
  },
  consentOptions: {
    basicConsent: [
      { id: 1, text: '我确认我已达到法定成年年龄', checked: true },
      { id: 2, text: '我确认此行为是在完全自愿的情况下进行的', checked: true },
      { id: 3, text: '我确认我在签署本同意书时意识清醒，没有受到酒精或药物的影响', checked: true },
    ],
    specificConsent: [
      { id: 1, text: '我同意特定行为A', checked: true },
      { id: 2, text: '我同意特定行为B', checked: true },
    ],
    additionalTerms: '双方约定的其他条款内容',
  },
  signatures: {
    person1: '', // 将从本地存储获取真实的签名数据
    person2: '',
    person1Time: new Date().toLocaleString(),
    person2Time: new Date().toLocaleString(),
  },
})

// 尝试从localStorage获取签名数据
onMounted(() => {
  try {
    // 从localStorage获取签名数据
    const storedData = localStorage.getItem('consentData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      // 更新签名数据
      if (parsedData.signatures) {
        consentData.value.signatures = parsedData.signatures
      }
      // 更新身份信息
      if (parsedData.identities) {
        consentData.value.identities = parsedData.identities
      }
      // 更新选项和条款
      if (parsedData.consentOptions) {
        consentData.value.consentOptions = parsedData.consentOptions
      }
      // 更新元数据
      if (parsedData.metadata) {
        consentData.value.metadata = parsedData.metadata
        // 如果没有时间范围，设置为当天
        if (!consentData.value.metadata.timeRange) {
          consentData.value.metadata.timeRange = getCurrentDateString()
        }
      }
    }
  } catch (error) {
    console.error('获取存储数据失败:', error)
  }
})

// 导出为PDF
const exportAsPDF = () => {
  isExporting.value = true
  const element = document.getElementById('consent-document')
  if (element) {
    html2canvas(element)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4')
        const imgWidth = 210 // A4 宽度
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save(`同意书-${consentId.value}.pdf`)
        isExporting.value = false
      })
      .catch((error) => {
        console.error('PDF导出失败:', error)
        alert('PDF导出失败，请稍后重试')
        isExporting.value = false
      })
  } else {
    alert('无法找到要导出的文档元素')
    isExporting.value = false
  }
}

// 导出为图片
const exportAsImage = () => {
  isExporting.value = true
  const element = document.getElementById('consent-document')
  if (element) {
    html2canvas(element)
      .then((canvas) => {
        const link = document.createElement('a')
        link.download = `同意书-${consentId.value}.png`
        link.href = canvas.toDataURL()
        link.click()
        isExporting.value = false
      })
      .catch((error) => {
        console.error('图片导出失败:', error)
        alert('图片导出失败，请稍后重试')
        isExporting.value = false
      })
  } else {
    alert('无法找到要导出的文档元素')
    isExporting.value = false
  }
}

// 返回首页
const backToHome = () => {
  router.push('/')
}

// 创建新的同意书
const createNew = () => {
  router.push('/consent')
}
</script>

<template>
  <div class="export-container">
    <h1>同意书预览与导出</h1>

    <div id="consent-document" class="consent-document">
      <div class="document-header">
        <h2>性同意书</h2>
        <p>文档编号: {{ consentId }}</p>
        <p>日期: {{ consentData.metadata.date }}</p>
        <p v-if="consentData.metadata.location">地点: {{ consentData.metadata.location }}</p>
      </div>

      <div class="document-section">
        <h3>参与方信息</h3>
        <div class="parties">
          <div class="party">
            <h4>甲方信息</h4>
            <p>姓名: {{ consentData.identities.person1.name }}</p>
            <p>联系方式: {{ consentData.identities.person1.contact }}</p>
            <p
              v-if="
                consentData.identities.person1.idType && consentData.identities.person1.idNumber
              "
            >
              {{ consentData.identities.person1.idType }}:
              {{ consentData.identities.person1.idNumber }}
            </p>
          </div>

          <div class="party">
            <h4>乙方信息</h4>
            <p>姓名: {{ consentData.identities.person2.name }}</p>
            <p>联系方式: {{ consentData.identities.person2.contact }}</p>
            <p
              v-if="
                consentData.identities.person2.idType && consentData.identities.person2.idNumber
              "
            >
              {{ consentData.identities.person2.idType }}:
              {{ consentData.identities.person2.idNumber }}
            </p>
          </div>
        </div>
      </div>

      <div class="document-section">
        <h3>基本同意声明</h3>
        <ul>
          <li v-for="item in consentData.consentOptions.basicConsent" :key="item.id">
            {{ item.text }}
          </li>
        </ul>
      </div>

      <div class="document-section" v-if="consentData.consentOptions.specificConsent.length > 0">
        <h3>具体同意事项</h3>
        <ul>
          <li v-for="item in consentData.consentOptions.specificConsent" :key="item.id">
            {{ item.text }}
          </li>
        </ul>
        <!-- 添加时间范围声明 -->
        <p class="time-range">
          <strong>有效时间：</strong> 我同意在{{ consentData.metadata.timeRange }}进行上述行为。
        </p>
      </div>

      <div class="document-section" v-if="consentData.consentOptions.additionalTerms">
        <h3>补充条款</h3>
        <p>{{ consentData.consentOptions.additionalTerms }}</p>
      </div>

      <div class="document-section">
        <h3>签名确认</h3>
        <div class="signatures">
          <div class="signature">
            <p>甲方签名:</p>
            <div class="signature-box">
              <!-- 显示实际签名图像 -->
              <img
                v-if="consentData.signatures.person1"
                :src="consentData.signatures.person1"
                alt="甲方签名"
                class="signature-image"
              />
              <div v-else class="placeholder-signature">
                {{ consentData.identities.person1.name }}
              </div>
            </div>
            <p>签名时间: {{ consentData.signatures.person1Time }}</p>
          </div>

          <div class="signature">
            <p>乙方签名:</p>
            <div class="signature-box">
              <!-- 显示实际签名图像 -->
              <img
                v-if="consentData.signatures.person2"
                :src="consentData.signatures.person2"
                alt="乙方签名"
                class="signature-image"
              />
              <div v-else class="placeholder-signature">
                {{ consentData.identities.person2.name }}
              </div>
            </div>
            <p>签名时间: {{ consentData.signatures.person2Time }}</p>
          </div>
        </div>
      </div>

      <div class="document-footer">
        <p>
          声明：此同意书仅作为双方同意的记录，不具备完全法律效力。不同地区法律规定不同，请根据当地法律谨慎使用。
        </p>
        <p>此同意书可以随时撤回，撤回后不再具有任何效力。</p>
        <p>生成时间: {{ new Date().toLocaleString() }}</p>
      </div>
    </div>

    <div class="actions">
      <button @click="exportAsPDF" :disabled="isExporting" class="action-btn pdf-btn">
        {{ isExporting ? '导出中...' : '导出为PDF' }}
      </button>
      <button @click="exportAsImage" :disabled="isExporting" class="action-btn img-btn">
        {{ isExporting ? '导出中...' : '导出为图片' }}
      </button>
      <button @click="createNew" class="action-btn new-btn">创建新同意书</button>
      <button @click="backToHome" class="action-btn home-btn">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.export-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.consent-document {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
}

.document-header {
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.document-section {
  margin-bottom: 20px;
}

.parties,
.signatures {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.party,
.signature {
  flex: 1;
}

.signature-box {
  height: 100px;
  border: 1px solid #ddd;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.signature-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.placeholder-signature {
  font-style: italic;
  color: #888;
}

.time-range {
  margin-top: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-left: 4px solid #3498db;
  font-weight: normal;
}

.document-footer {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 0.9em;
  color: #666;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  min-width: 150px;
}

.pdf-btn {
  background-color: #e74c3c;
  color: white;
}

.img-btn {
  background-color: #3498db;
  color: white;
}

.new-btn {
  background-color: #2ecc71;
  color: white;
}

.home-btn {
  background-color: #f1f1f1;
  color: #333;
}

@media (max-width: 600px) {
  .parties,
  .signatures {
    flex-direction: column;
  }

  .action-btn {
    flex: 1 0 100%;
  }
}
</style>
