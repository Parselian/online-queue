import {useQueueStore} from '@/stores/useQueueStore'
import axios from 'axios'
import {useSessionForm} from '@/components/session/features/useSessionForm'

const store = useQueueStore()
const {getActiveSessionData} = useSessionForm()

export const useCreateTicketForm = () => {
  const getTicket = async () => {
    try {
      const activeSessionData = await getActiveSessionData()
      store.setSessionName(activeSessionData.session_name)
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/get-single-ticket`, {
        params: {
          student_id: localStorage.user_id,
          session_id: localStorage.selected_session_id
        }
      })

      store.setIsOpenedTicketExists(!response.data.is_ticket_closed)
      store.setOpenedTicketData(response.data)
    } catch (e) {
      store.setIsOpenedTicketExists(false)
      console.error(e)
    }
  }

  const createQueueTicket = async () => {
    const activeSessionData = await getActiveSessionData()
    store.setSessionName(activeSessionData.session_name)

    try {
      console.log({
        session_id: localStorage.selected_session_id,
        student_id: localStorage.user_id,
        user_name: localStorage.user_name,
        user_surname: localStorage.user_surname,
        ticket_request: store.ticketRequest
      });
      
      await axios.post(`${import.meta.env.VITE_HOSTNAME}/api/create-ticket`, {
        session_id: localStorage.selected_session_id,
        student_id: localStorage.user_id,
        user_name: localStorage.user_name,
        user_surname: localStorage.user_surname,
        ticket_request: store.ticketRequest
      })

      store.resetTicketRequest()
      await getTicket()
    } catch (e) {
      console.error(e)
    }
  }

  return {
    createQueueTicket,
    getTicket,
  }
}
