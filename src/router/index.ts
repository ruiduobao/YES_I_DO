import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // 性同意相关路由
    {
      path: '/consent',
      name: 'consent',
      component: () => import('../views/ConsentView.vue'),
    },
    {
      path: '/export/:id',
      name: 'export',
      component: () => import('../views/ExportView.vue'),
    },
  ],
})

export default router
