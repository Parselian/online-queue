import { useQueueAdminStore } from "@/stores/useQueueAdminStore"
import axios from 'axios'

const store = useQueueAdminStore()

export const getNextClient = async () => {
  if (!localStorage.user_id) return
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-next-order-ticket`, {params: {
      student_id: localStorage.user_id,
      session_id: localStorage.selected_session_id
    }})

    const data = response.data

    store.currentClient = {
      ticketId: data.id || null,
      ticketAbbreviation: data.ticket_abbreviation || '-',
      ticketRequest: data.ticket_request || '-',
      studentGroup: data.user_group || '-',
      studentName: `${data.user_name} ${data.user_surname}` || '-'
    }
  } catch (e) {
    /* If we didn`t receive next client data (got error from the server) we clear currentClient object and end this function */
    store.currentClient.ticketId = null
    store.currentClient.ticketAbbreviation = '-'
    store.currentClient.ticketRequest = '-'
    store.currentClient.studentGroup = '-'
    store.currentClient.studentName = '-'

    console.error(e)
  }
}

const closeCurrentTicket = async () => {
  try {
    if (store.currentClient.ticketId) {
      await axios.put(`${import.meta.env.VITE_HOSTNAME}/api/close-ticket`, {ticket_id: store.currentClient.ticketId})
    }
  } catch (e) {
    console.error(e)
  }
}

export const updateQueue = async (shouldCloseCurrentTicket = true) => {
  try {
    if (shouldCloseCurrentTicket) await closeCurrentTicket()
    await getNextClient()
    await getQueueAmount()
  } catch (e) {
    console.error(e)
  }
}

export const getQueueAmount = async () => {
  if (!localStorage.user_id) return
  try {
    const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-queue-tickets`, {params: {session_id: localStorage.selected_session_id}})
    console.log(response);

    store.queueAmount = response.data.length
  } catch (e) {
    console.error(e)
  }
}
getQueueAmount()

export const clearQueue = async () => {
  if (!localStorage.selected_session_id) return
  if (!confirm('Вы действительно хотите удалить все талоны текущей сессии?')) return
  try {
    const response = await axios.delete(`${import.meta.env.VITE_HOSTNAME}/api/clear-queue`, {params: {session_id: localStorage.selected_session_id}})
    await console.log(response)
    await updateQueue(false)
  } catch (e) {
    console.error(e)
  }
}