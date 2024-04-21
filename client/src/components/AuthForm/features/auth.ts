import { useAuthStore } from '@/stores/useAuthStore'
import axios from 'axios'
import router from '@/router'

export const login = async () => {
  const store = useAuthStore()

  try {
    const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/login`, {params: {login: store.userFormData.login, password: store.userFormData.password}})

    localStorage.clear()
    localStorage.user_id = response.data.id
    localStorage.user_login = response.data.login
    localStorage.user_password = response.data.password
    localStorage.user_name = response.data.user_name
    localStorage.user_surname = response.data.user_surname
    localStorage.user_group = response.data.user_group
    localStorage.user_type = response.data.user_type

    if (localStorage.user_type == 2) router.push('/admin/session')
    else router.push('/session')

  } catch (e: any) {
    if (e.response.status === 453) alert('Неправильный логин или пароль!')
    console.error(e)
  }
}

export const register = async () => {
  const store = useAuthStore()

  try {
    const response = await axios.post(`${import.meta.env.VITE_HOSTNAME}/api/user`, store.userFormData)

    if (response.status >= 200 && response.status < 300) {
      alert('Вы успешно зарегестрировались!')
      router.push('/login')
    }
  } catch (e: any) {
    if (e.response.status === 452) alert('Пользователь с таким логином уже существует!')
    console.error(e)
  }
}