import axios from 'axios'
import router from '@/router'
import { useSessionsStore } from '@/stores/useSessionsStore'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
const sessionsStore = useSessionsStore()

export const useSessionForm = () => {
  const getSessionsList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/sessions`, {
        params: {
          user_type: localStorage.user_type,
          user_id: localStorage.user_id,
          selected_subject_id: sessionsStore.selectedSubjectId
        }
      })

      sessionsStore.setSessionsList(await response.data)
      sessionsStore.clearSelectedSessionId()
    } catch (e) {
      console.error(e)
    }
  }

  const getSubjectsList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/subjects`, {
        params: {
          user_id: localStorage.user_id,
          user_type: localStorage.user_type,
        }
    })
      sessionsStore.setSubjectsList(await response.data)
    } catch (e) {
      console.error(e)
    }
  }

  const getActiveSessionData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-session`, {params: {session_id: localStorage.selected_session_id}})

      return response.data
    } catch (e) {
      console.error(e)
      return router.push('/session')
    }
  }

  const selectSession = () => {
    localStorage.selected_session_id = sessionsStore.selectedSessionId

    if (authStore.isUserAdmin) return router.push('/admin/queue')

    return router.push('/queue')
  }

  const createSession = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_HOSTNAME}/api/create-session`, {session_name: sessionsStore.newSessionName, creator_id: localStorage.user_id})
      await getSessionsList()
    } catch (e) {
      console.error(e)
    }
  }

  const deleteSession = async () => {
    if (!confirm('Вы действительно хотите удалить выбранную сессию и все связанные с ней талоны?')) return
    try {
      const response = await axios.delete(`${import.meta.env.VITE_HOSTNAME}/api/delete-session`, {params: {session_id: sessionsStore.selectedSessionId}})
      await getSessionsList()
      console.log(response)
    } catch (e) {
      console.error(e)
    }
  }

  return {
    createSession,
    deleteSession,
    getActiveSessionData,
    getSessionsList,
    getSubjectsList,
    selectSession,
  }
}