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

  const closeCurrentTicket = async (ticketId?: number | string) => {
    try {
      if (ticketId || store.currentClientInfo?.ticketId) {
        console.log('here');
        
        await axios.put(`${import.meta.env.VITE_HOSTNAME}/api/close-ticket`, {
          ticket_id: ticketId ? ticketId : store.currentClientInfo?.ticketId
        })

        if (ticketId) alert('Тикет успешно закрыт!');
      }
    } catch (e) {
      alert('Что-то пошло не так.');
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

  const getStudentQueuePosition = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-queue-tickets`, {
        params: {
          session_id: localStorage.selected_session_id
        }
      })

      const position = await response.data.findIndex((ticket: any, index: number) => +ticket.student_id === +localStorage.user_id)

      store.setStudentQueuePosition(position + 1)
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

  const getAllTickets = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-queue-tickets`, {
        params: {
          session_id: localStorage.selected_session_id
        }
      })

      console.log(localStorage.selected_session_id);
      

      store.setQueueTicketsList(response.data)
    } catch(e) {
      console.error('Ошибка во время получения списка тикетов', e)
    }
  }

  const moveTicketToEnd = async (ticketId: number | string) => {
    try {
      console.log(ticketId);
      
      const response = await axios.put(`${import.meta.env.VITE_HOSTNAME}/api/move-ticket-to-end`, {
        session_id: localStorage.selected_session_id,
        ticket_id: ticketId,
      })

      alert('Тикет успешно перемещён в конец очереди!');
    } catch (e) {
      alert('Что-то пошло не так');
      
      console.error('Ошибка перемещения тикета в конец очереди', e);
    }
  }

  return {
    getNextClient,
    getQueueAmount,
    clearQueue,
    closeCurrentTicket,
    updateQueue,
    getAllTickets,
    moveTicketToEnd,
    getStudentQueuePosition,
  }
}
