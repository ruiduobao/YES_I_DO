<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <div class="logo-container">
        <h1 class="app-title">Yes I Do</h1>
        <p class="app-subtitle">性同意记录应用</p>
      </div>

      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/consent">创建同意书</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>© 2025 Yes I Do - 性同意记录应用</p>
      <p>该应用仅作为双方沟通和记录的辅助工具，不构成法律文件。</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
  width: 100%;
}

.logo-container {
  text-align: center;
  margin-bottom: 20px;
}

.app-title {
  font-size: 2rem;
  color: #e74c3c;
  margin: 0;
}

.app-subtitle {
  font-size: 1rem;
  color: #666;
  margin: 5px 0 0;
}

nav {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
}

nav a {
  margin: 0 15px;
  padding: 5px 10px;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.3s;
}

nav a:hover {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

nav a.router-link-exact-active {
  color: #e74c3c;
  border-bottom: 2px solid #e74c3c;
}

main {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

footer {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  color: #666;
  font-size: 0.9rem;
  border-top: 1px solid #eee;
  width: 100%;
}

footer p {
  margin: 5px 0;
}

@media (min-width: 768px) {
  header {
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 30px;
  }

  .logo-container {
    margin-bottom: 0;
    text-align: left;
  }

  nav {
    width: auto;
    padding: 0;
    justify-content: flex-end;
  }
}

@media (max-width: 480px) {
  nav a {
    margin: 0 8px;
    font-size: 0.9rem;
  }

  .app-title {
    font-size: 1.5rem;
  }

  .app-subtitle {
    font-size: 0.9rem;
  }
}
</style>
