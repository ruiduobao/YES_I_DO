<script setup lang="ts">
import { defineProps } from 'vue'

// 定义组件的属性
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="consent-preview">
    <h2>预览同意书</h2>
    <p class="preview-intro">请确认以下内容无误</p>

    <div class="preview-document">
      <div class="document-header">
        <h2>性同意书</h2>
        <p>日期: {{ formData.metadata.date }}</p>
        <p v-if="formData.metadata.location">地点: {{ formData.metadata.location }}</p>
      </div>

      <div class="document-section">
        <h3>参与方信息</h3>
        <div class="parties">
          <div class="party">
            <h4>甲方信息</h4>
            <p>姓名: {{ formData.identities.person1.name || '(未填写)' }}</p>
            <p v-if="formData.identities.person1.contact">
              联系方式: {{ formData.identities.person1.contact }}
            </p>
            <p v-if="formData.identities.person1.idType && formData.identities.person1.idNumber">
              {{ formData.identities.person1.idType }}: {{ formData.identities.person1.idNumber }}
            </p>
          </div>

          <div class="party">
            <h4>乙方信息</h4>
            <p>姓名: {{ formData.identities.person2.name || '(未填写)' }}</p>
            <p v-if="formData.identities.person2.contact">
              联系方式: {{ formData.identities.person2.contact }}
            </p>
            <p v-if="formData.identities.person2.idType && formData.identities.person2.idNumber">
              {{ formData.identities.person2.idType }}: {{ formData.identities.person2.idNumber }}
            </p>
          </div>
        </div>
      </div>

      <div class="document-section">
        <h3>基本同意声明</h3>
        <ul>
          <li
            v-for="item in formData.consentOptions.basicConsent.filter((i) => i.checked)"
            :key="item.id"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>

      <div
        class="document-section"
        v-if="formData.consentOptions.specificConsent.some((i) => i.checked)"
      >
        <h3>具体同意事项</h3>
        <ul>
          <li
            v-for="item in formData.consentOptions.specificConsent.filter((i) => i.checked)"
            :key="item.id"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>

      <div class="document-section" v-if="formData.consentOptions.additionalTerms">
        <h3>补充条款</h3>
        <p>{{ formData.consentOptions.additionalTerms }}</p>
      </div>

      <div class="document-section">
        <h3>签名确认</h3>
        <div class="signatures">
          <div class="signature">
            <p>甲方签名:</p>
            <div class="signature-box">
              <img
                v-if="formData.signatures.person1"
                :src="formData.signatures.person1"
                alt="甲方签名"
                class="signature-img"
              />
              <div v-else class="missing-signature">(未签名)</div>
            </div>
            <p v-if="formData.signatures.person1Time">
              签名时间: {{ formData.signatures.person1Time }}
            </p>
          </div>

          <div class="signature">
            <p>乙方签名:</p>
            <div class="signature-box">
              <img
                v-if="formData.signatures.person2"
                :src="formData.signatures.person2"
                alt="乙方签名"
                class="signature-img"
              />
              <div v-else class="missing-signature">(未签名)</div>
            </div>
            <p v-if="formData.signatures.person2Time">
              签名时间: {{ formData.signatures.person2Time }}
            </p>
          </div>
        </div>
      </div>

      <div class="document-footer">
        <p>
          声明：此同意书仅作为双方同意的记录，不具备完全法律效力。不同地区法律规定不同，请根据当地法律谨慎使用。
        </p>
        <p>此同意书可以随时撤回，撤回后不再具有任何效力。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.consent-preview {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  text-align: center;
  margin-bottom: 5px;
  color: #333;
}

.preview-intro {
  text-align: center;
  margin-bottom: 20px;
  color: #666;
  font-size: 0.9em;
}

.preview-document {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Times New Roman', Times, serif;
  max-width: 800px;
  margin: 0 auto;
}

.document-header {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 20px;
}

.document-header h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

.document-section {
  margin-bottom: 25px;
}

h3 {
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  margin-top: 20px;
  margin-bottom: 15px;
}

h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #555;
}

.parties,
.signatures {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.party,
.signature {
  flex: 1;
  min-width: 250px;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

.signature-box {
  height: 100px;
  border: 1px solid #ddd;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.signature-img {
  max-width: 100%;
  max-height: 90px;
}

.missing-signature {
  color: #999;
  font-style: italic;
}

.document-footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-size: 0.9em;
  color: #666;
}

@media (max-width: 600px) {
  .preview-document {
    padding: 15px;
  }

  .parties,
  .signatures {
    flex-direction: column;
  }
}
</style>
