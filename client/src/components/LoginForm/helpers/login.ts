import { useLoginStore } from "../../../stores/useLoginStore"
import axios from 'axios'
import router from '@/router'

export const login = async () => {
  const store = useLoginStore()

  try {
    if (!store.isFormFilled) {
      alert('error')
      return false
    }

    const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/login`, {params: {login: store.login, password: store.password}})

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