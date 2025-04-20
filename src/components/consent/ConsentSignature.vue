<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  signatures: {
    type: Object,
    required: true,
  },
  identities: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:signatures'])

// 本地数据
const localSignatures = ref({
  person1: props.signatures.person1 || '',
  person2: props.signatures.person2 || '',
  person1Time: props.signatures.person1Time || '',
  person2Time: props.signatures.person2Time || '',
})

// 画布相关
const person1Canvas = ref(null)
const person2Canvas = ref(null)
const person1Context = ref(null)
const person2Context = ref(null)
const isDrawing1 = ref(false)
const isDrawing2 = ref(false)

// 初始化画布
onMounted(() => {
  if (person1Canvas.value) {
    person1Context.value = person1Canvas.value.getContext('2d')
    person1Context.value.lineWidth = 3
    person1Context.value.lineCap = 'round'
    person1Context.value.strokeStyle = '#000'

    // 恢复已有签名
    if (localSignatures.value.person1) {
      const img = new Image()
      img.onload = () => {
        person1Context.value.drawImage(img, 0, 0)
      }
      img.src = localSignatures.value.person1
    }
  }

  if (person2Canvas.value) {
    person2Context.value = person2Canvas.value.getContext('2d')
    person2Context.value.lineWidth = 3
    person2Context.value.lineCap = 'round'
    person2Context.value.strokeStyle = '#000'

    // 恢复已有签名
    if (localSignatures.value.person2) {
      const img = new Image()
      img.onload = () => {
        person2Context.value.drawImage(img, 0, 0)
      }
      img.src = localSignatures.value.person2
    }
  }
})

// 甲方绘制相关
const startPerson1Drawing = (e) => {
  isDrawing1.value = true
  draw1(e)
}

const draw1 = (e) => {
  if (!isDrawing1.value) return

  const rect = person1Canvas.value.getBoundingClientRect()
  const x = (e.clientX || e.touches[0].clientX) - rect.left
  const y = (e.clientY || e.touches[0].clientY) - rect.top

  person1Context.value.lineTo(x, y)
  person1Context.value.stroke()
  person1Context.value.beginPath()
  person1Context.value.moveTo(x, y)
}

const stopPerson1Drawing = () => {
  if (isDrawing1.value) {
    isDrawing1.value = false
    person1Context.value.beginPath()
    // 保存签名为图片
    localSignatures.value.person1 = person1Canvas.value.toDataURL()
    localSignatures.value.person1Time = new Date().toLocaleString()
    updateSignatures()
  }
}

// 乙方绘制相关
const startPerson2Drawing = (e) => {
  isDrawing2.value = true
  draw2(e)
}

const draw2 = (e) => {
  if (!isDrawing2.value) return

  const rect = person2Canvas.value.getBoundingClientRect()
  const x = (e.clientX || e.touches[0].clientX) - rect.left
  const y = (e.clientY || e.touches[0].clientY) - rect.top

  person2Context.value.lineTo(x, y)
  person2Context.value.stroke()
  person2Context.value.beginPath()
  person2Context.value.moveTo(x, y)
}

const stopPerson2Drawing = () => {
  if (isDrawing2.value) {
    isDrawing2.value = false
    person2Context.value.beginPath()
    // 保存签名为图片
    localSignatures.value.person2 = person2Canvas.value.toDataURL()
    localSignatures.value.person2Time = new Date().toLocaleString()
    updateSignatures()
  }
}

// 清除签名
const clearPerson1Signature = () => {
  if (person1Context.value) {
    person1Context.value.clearRect(0, 0, person1Canvas.value.width, person1Canvas.value.height)
    localSignatures.value.person1 = ''
    localSignatures.value.person1Time = ''
    updateSignatures()
  }
}

const clearPerson2Signature = () => {
  if (person2Context.value) {
    person2Context.value.clearRect(0, 0, person2Canvas.value.width, person2Canvas.value.height)
    localSignatures.value.person2 = ''
    localSignatures.value.person2Time = ''
    updateSignatures()
  }
}

// 更新签名数据
const updateSignatures = () => {
  emit('update:signatures', { ...localSignatures.value })

  // 同时保存到localStorage，确保导出时可以使用
  try {
    const existingData = localStorage.getItem('consentData') || '{}'
    const data = JSON.parse(existingData)

    // 更新数据中的签名部分
    data.signatures = { ...localSignatures.value }

    // 保存回localStorage
    localStorage.setItem('consentData', JSON.stringify(data))
  } catch (error) {
    console.error('保存签名数据失败:', error)
  }
}
</script>

<template>
  <div class="consent-signature">
    <h2>电子签名</h2>
    <p class="section-description">在下方框中签名确认同意书内容</p>

    <div class="signatures">
      <div class="signature-section">
        <h3>甲方: {{ props.identities.person1.name }}</h3>
        <div class="signature-pad">
          <canvas
            ref="person1Canvas"
            width="300"
            height="150"
            @mousedown="startPerson1Drawing"
            @mousemove="draw1"
            @mouseup="stopPerson1Drawing"
            @mouseleave="stopPerson1Drawing"
            @touchstart="startPerson1Drawing"
            @touchmove="draw1"
            @touchend="stopPerson1Drawing"
          ></canvas>
        </div>
        <div class="signature-actions">
          <button @click="clearPerson1Signature" class="clear-btn">清除签名</button>
          <span v-if="localSignatures.person1Time" class="signature-time">
            签名时间: {{ localSignatures.person1Time }}
          </span>
        </div>
      </div>

      <div class="signature-section">
        <h3>乙方: {{ props.identities.person2.name }}</h3>
        <div class="signature-pad">
          <canvas
            ref="person2Canvas"
            width="300"
            height="150"
            @mousedown="startPerson2Drawing"
            @mousemove="draw2"
            @mouseup="stopPerson2Drawing"
            @mouseleave="stopPerson2Drawing"
            @touchstart="startPerson2Drawing"
            @touchmove="draw2"
            @touchend="stopPerson2Drawing"
          ></canvas>
        </div>
        <div class="signature-actions">
          <button @click="clearPerson2Signature" class="clear-btn">清除签名</button>
          <span v-if="localSignatures.person2Time" class="signature-time">
            签名时间: {{ localSignatures.person2Time }}
          </span>
        </div>
      </div>
    </div>

    <div class="signature-note">
      <p>
        <strong>注意:</strong> 签名表示你已阅读并同意前面页面中的所有条款。
        签名完成后将无法修改之前的选项，请确保所有内容准确无误。
      </p>
    </div>
  </div>
</template>

<style scoped>
.consent-signature {
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

.signatures {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

@media (min-width: 768px) {
  .signatures {
    flex-direction: row;
    gap: 20px;
  }

  .signature-section {
    flex: 1;
  }
}

.signature-section {
  display: flex;
  flex-direction: column;
}

h3 {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 15px;
}

.signature-pad {
  border: 2px dashed #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  cursor: crosshair;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}

canvas {
  display: block;
  max-width: 100%;
  touch-action: none;
}

.signature-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
}

.signature-time {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.signature-note {
  margin-top: 30px;
  padding: 15px;
  background-color: #f8f9fa;
  border-left: 4px solid #f39c12;
  border-radius: 0 4px 4px 0;
}

.signature-note p {
  margin: 0;
  color: #555;
}
</style>
