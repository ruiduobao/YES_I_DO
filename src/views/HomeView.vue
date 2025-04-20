<script setup lang="ts">
// 没有组件导入，简化页面
</script>

<template>
  <div class="home">
    <div class="home-content">
      <h1>性同意记录应用</h1>
      <p class="intro">
        即用即走的同意书记录工具，保护双方权益，促进清晰沟通。
        所有数据均保存在本地，确保您的隐私安全。
      </p>

      <div class="features">
        <div class="feature">
          <div class="feature-icon">📝</div>
          <h3>明确同意</h3>
          <p>清晰记录双方同意内容，避免误解和争议</p>
        </div>

        <div class="feature">
          <div class="feature-icon">✍️</div>
          <h3>电子签名</h3>
          <p>简单便捷的电子签名功能，确认双方意愿</p>
        </div>

        <div class="feature">
          <div class="feature-icon">🔒</div>
          <h3>隐私保护</h3>
          <p>数据本地存储，不上传服务器，保护个人隐私</p>
        </div>

        <div class="feature">
          <div class="feature-icon">📄</div>
          <h3>导出记录</h3>
          <p>支持 PDF 和图片格式导出，方便保存和分享</p>
        </div>
      </div>

      <div class="cta">
        <router-link to="/consent" class="create-btn">创建同意书</router-link>
      </div>

      <div class="disclaimer">
        <p>
          <strong>重要提示：</strong> 此应用仅作为沟通和记录工具，不构成法律文件。
          不同地区法律规定不同，请谨慎使用。详情请参阅法律提示。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  display: flex;
  justify-content: center;
}

.home-content {
  text-align: center;
  padding: 40px 20px;
  max-width: 800px;
  width: 100%;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

.intro {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.features {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;
  width: 100%;
}

.feature {
  width: 100%;
  padding: 30px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  text-align: center;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.feature h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #3498db;
}

.feature p {
  color: #666;
  line-height: 1.5;
}

.cta {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.create-btn {
  display: inline-block;
  background-color: #e74c3c;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 15px 40px;
  border-radius: 30px;
  text-decoration: none;
  transition: background-color 0.3s;
  box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);
  max-width: 100%;
}

.create-btn:hover {
  background-color: #c0392b;
}

.disclaimer {
  max-width: 800px;
  margin: 0 auto;
  font-size: 0.9rem;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #f39c12;
}

.disclaimer p {
  margin: 0;
  color: #555;
  text-align: left;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .intro {
    font-size: 1rem;
  }

  .create-btn {
    font-size: 1.1rem;
    padding: 12px 30px;
    width: 80%;
  }
}

@media (max-width: 480px) {
  .create-btn {
    width: 100%;
    font-size: 1rem;
    padding: 10px 20px;
  }
}
</style>
