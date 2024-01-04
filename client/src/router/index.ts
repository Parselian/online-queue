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
      path: '/session',
      name: 'session',
      meta: {
        layout: 'Default',
      },
      component: () => import('../views/SessionView.vue')
    },
    {
      path: '/admin/session',
      name: 'admin-session',
      meta: {
        layout: 'Default',
      },
      component: () => import('../views/SessionView.vue')
    },
    {
      path: '/queue',
      name: 'queue',
      meta: {
        layout: 'Default',
      },
      component: () => import('../views/QueueView.vue')
    },
    {
      path: '/admin/queue',
      name: 'admin-queue',
      meta: {
        layout: 'Default',
      },
      component: () => import('../views/QueueView.vue')
    },
    {
      path: '/admin',
      name: 'admin-home',
      meta: {
        layout: 'Default',
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/admin/register',
      name: 'admin-register',
      meta: {
        layout: 'Auth',
      },
      component: () => import('../views/RegistrationView.vue')
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
