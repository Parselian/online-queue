import { useQueueClientStore } from "@/stores/useQueueClientStore"
import axios from 'axios'
import router from '@/router'

const store = useQueueClientStore()

export const getActiveSession = async () => {
  if (!localStorage.user_id) return
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-session`, {params: {session_id: localStorage.selected_session_id}})
    store.ticketFormData.session_name = response.data.session_name
    return true;
  } catch (e) {
    router.push('/session')
    return false;
  }
}
getActiveSession()

export const createQueueTicket = async () => {
  const activeSession = await getActiveSession()
  console.log(activeSession);

  if (!activeSession) return
  if (!store.ticketFormData.ticket_request) return store.isRegistrationAlertVisible = true

  try {
    await axios.post(`${import.meta.env.VITE_HOSTNAME}/api/create-ticket`, {session_id: localStorage.selected_session_id, ...store.ticketFormData})
    await getTicket()
    store.isRegistrationAlertVisible = false
  } catch (e) {
    console.error(e)
  }
}

export const getTicket = async () => {
  const activeSession = await getActiveSession()
  if (!activeSession) return

  if (!localStorage.user_id) return
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-single-ticket`, {params: {
      student_id: localStorage.user_id,
      session_id: localStorage.selected_session_id
    }})

    store.hasStudentTicket = !response.data.is_ticket_closed ? true : false
    store.ticketData = response.data
  } catch (e) {
    store.hasStudentTicket = false
    console.error(e)
  }
}