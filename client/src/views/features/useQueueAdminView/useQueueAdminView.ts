import { useQueueStore } from '@/stores/useQueueStore'
import axios from 'axios'

const store = useQueueStore()

export const useQueueAdminView = () => {
  const getNextClient = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-next-order-ticket`, {
        params: {
          student_id: localStorage.user_id,
          session_id: localStorage.selected_session_id
        }
      })

      const data = response.data

      store.setCurrentClientInfo({
        ticketId: data.id,
        ticketAbbreviation: data.ticket_abbreviation || '-',
        ticketRequest: data.ticket_request || '-',
        studentGroup: data.user_group || '-',
        studentName: `${data.user_name} ${data.user_surname}` || '-'
      })
    } catch (e) {
      /* If we didn`t receive next client data (got error from the server) we clear currentClient object and end this function */
      store.setCurrentClientInfo({
        ticketId: null,
        ticketAbbreviation: '-',
        ticketRequest: '-',
        studentGroup: '-',
        studentName: '-'
      })

      console.error(e)
    }
  }

  const closeCurrentTicket = async () => {
    try {
      if (store.currentClientInfo?.ticketId) {
        await axios.put(`${import.meta.env.VITE_HOSTNAME}/api/close-ticket`, {
          ticket_id: store.currentClientInfo?.ticketId
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updateQueue = async (shouldCloseCurrentTicket = true) => {
    try {
      if (shouldCloseCurrentTicket) await closeCurrentTicket()
      await getNextClient()
      await getQueueAmount()
    } catch (e) {
      console.error(e)
    }
  }

  const getQueueAmount = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-queue-tickets`, {
        params: {
          session_id: localStorage.selected_session_id
        }
      })

      store.setQueueAmount(response.data.length)
    } catch (e) {
      console.error(e)
    }
  }

  const clearQueue = async () => {
    if (!confirm('Вы действительно хотите удалить все талоны текущей сессии?')) return
    try {
      const response = await axios.delete(`${import.meta.env.VITE_HOSTNAME}/api/clear-queue`, {
        params: {
          session_id: localStorage?.selected_session_id
        }
      })
      await console.log(response)
      await updateQueue(false)
    } catch (e) {
      console.error(e)
    }
  }

  return {
    getNextClient,
    getQueueAmount,
    clearQueue,
    closeCurrentTicket,
    updateQueue,
  }
}
