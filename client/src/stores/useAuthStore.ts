import { defineStore } from "pinia"
import router from '@/router'
import { computed, ref } from "vue"

export const useAuthStore = defineStore('auth',() => {
  const userData = ref({
    login: '',
    password: '',
    user_name: '',
    user_surname: '',
    user_group: null,
    user_type: 1,
  })
  const isLoggedIn = ref(false)
  const getActiveRoute = ref(router.currentRoute.value.name)
  const isActiveLoginRoute = computed(() => router.currentRoute.value.name === 'login')
  const isActiveRegisterRoute = computed(() => router.currentRoute.value.name === 'register')

  return {
    userData,
    isLoggedIn,
    getActiveRoute,
    isActiveLoginRoute,
    isActiveRegisterRoute,
  }
})