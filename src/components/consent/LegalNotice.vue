<script setup lang="ts">
import { ref } from 'vue'

const showFullNotice = ref(false)

const toggleNotice = () => {
  showFullNotice.value = !showFullNotice.value
}
</script>

<template>
  <div class="legal-notice" :class="{ expanded: showFullNotice }">
    <div class="notice-header" @click="toggleNotice">
      <h3>重要法律提示</h3>
      <span class="toggle-icon">{{ showFullNotice ? '▲' : '▼' }}</span>
    </div>

    <div v-if="showFullNotice" class="notice-content">
      <p class="notice-emphasis">
        此应用仅为沟通和记录同意的辅助工具，不构成法律文件，不能替代法律建议。
      </p>

      <ul>
        <li>该应用是一个记录工具，帮助双方明确共识，但不具有完全法律约束力。</li>
        <li>不同地区对于同意的法律规定不同，此应用不能满足所有司法管辖区的要求。</li>
        <li>签署此同意书不能替代实时、持续的交流，双方应始终保持沟通。</li>
        <li>任何人随时都有权撤回同意，无需任何理由，此同意书不能用于强制行为。</li>
        <li>使用此应用不能免除因违法行为产生的任何责任。</li>
        <li>如遇到紧急情况，请立即联系当地紧急服务或相关支持机构。</li>
      </ul>

      <p class="notice-privacy">
        <strong>隐私说明：</strong> 您的所有信息仅存储在本地设备上，不会上传至任何服务器。
        当您关闭或刷新页面时，未保存的数据可能会丢失。
      </p>
    </div>

    <div v-else class="notice-brief">
      <p>此应用仅为沟通和记录工具，无法律约束力。点击展开了解更多。</p>
    </div>
  </div>
</template>

<style scoped>
.legal-notice {
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.legal-notice.expanded {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.notice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: #f39c12;
  color: white;
  cursor: pointer;
  user-select: none;
}

.notice-header h3 {
  margin: 0;
  font-size: 1.1em;
}

.toggle-icon {
  font-weight: bold;
}

.notice-content {
  padding: 15px;
  border-top: 1px solid #eee;
}

.notice-brief {
  padding: 10px 15px;
  color: #666;
  font-style: italic;
  text-align: center;
}

.notice-emphasis {
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 15px;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
  color: #555;
}

.notice-privacy {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 0.9em;
  color: #666;
}

@media (max-width: 480px) {
  .notice-header h3 {
    font-size: 1em;
  }

  li {
    margin-bottom: 10px;
  }
}
</style>
