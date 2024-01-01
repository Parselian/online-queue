import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        layout: 'Default',
      },
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/admin',
      name: 'about',
      meta: {
        layout: 'Default',
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'Auth',
      },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        layout: 'Auth',
      },
      component: () => import('../views/RegistrationView.vue')
    }
  ]
})

export default router
