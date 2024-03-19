import { useRegistrationStore } from '@/stores/useRegistrationStore'
import axios from 'axios'
import router from '@/router'

export const createUser = async () => {
  const store = useRegistrationStore()
  try {
    if (store.isFormFilled && store.isPasswordPassed) return false

    const response = await axios.post(`${import.meta.env.VITE_HOSTNAME}/api/user`, store.newUserData)

    if (response.status >= 200 && response.status < 300) {
      alert('Вы успешно зарегестрировались!')
      router.push('/login')
    }
  } catch (e: any) {
    if (e.response.status === 452) alert('Пользователь с таким логином уже существует!')
    console.error(e)
  }
}