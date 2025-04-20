<template>
  <div class="about">
    <h1>关于 Yes I Do</h1>

    <section class="about-section">
      <h2>应用简介</h2>
      <p>
        Yes I Do 是一个简单、私密的性同意记录工具，帮助双方明确表达同意意愿，保护双方权益。
        该应用旨在促进健康、尊重的关系，确保双方在亲密行为中都基于知情和自愿的基础上作出决定。
      </p>
    </section>

    <section class="about-section">
      <h2>开源项目</h2>
      <p>Yes I Do 是一个<strong>完全免费</strong>的开源项目，代码托管在 GitHub 上：</p>
      <div class="github-link">
        <a href="https://github.com/ruiduobao/YES_I_DO" target="_blank" rel="noopener noreferrer">
          <span class="github-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </span>
          <span>github.com/ruiduobao/YES_I_DO</span>
        </a>
      </div>
      <p>欢迎贡献代码、提出建议或报告问题，帮助我们改进这个应用。</p>
    </section>

    <section class="about-section privacy">
      <h2>隐私保护</h2>
      <p><strong>您的隐私对我们至关重要。</strong> Yes I Do 是一个纯前端应用，这意味着：</p>
      <ul>
        <li>所有数据仅存储在您的本地设备上</li>
        <li>没有服务器后端，数据不会上传到任何服务器</li>
        <li>不会收集任何个人信息或使用情况数据</li>
        <li>您可以随时通过清除浏览器数据删除所有存储的信息</li>
      </ul>
    </section>

    <section class="about-section legal">
      <h2>法律声明</h2>
      <p>
        此应用仅作为沟通和记录工具，不构成法律文件。不同地区法律规定不同，请根据当地法律谨慎使用。
        签署的同意书可能不具备完全的法律效力，但可以作为双方沟通和意向的记录。
      </p>
    </section>

    <section class="about-section credits">
      <h2>技术实现</h2>
      <p>本应用使用以下开源技术构建：</p>
      <ul>
        <li>Vue.js - 前端框架</li>
        <li>HTML5 Canvas - 电子签名功能</li>
        <li>html2canvas & jsPDF - 导出功能</li>
      </ul>
    </section>

    <div class="version-info">
      <p>当前版本：1.0.0</p>
      <p>&copy; 2025 Yes I Do - 由开源社区共同维护</p>
    </div>
  </div>
</template>

<style>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #e74c3c;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.2rem;
}

.about-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #3498db;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-top: 0;
}

p {
  line-height: 1.6;
  color: #444;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.github-link {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.github-link a {
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.github-link a:hover {
  background-color: #f5f5f5;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.github-icon {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.github-icon svg {
  fill: #333;
}

.privacy {
  background-color: #f8f9fa;
  border-left: 4px solid #2ecc71;
}

.legal {
  background-color: #f8f9fa;
  border-left: 4px solid #f39c12;
}

.version-info {
  text-align: center;
  margin-top: 30px;
  color: #999;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .about {
    padding: 15px;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>
