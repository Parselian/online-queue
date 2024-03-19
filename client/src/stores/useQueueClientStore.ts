import { defineStore } from "pinia"

export const useQueueClientStore = defineStore('queueClient', {
  state: () => ({
    ticketFormData: {
      session_name: '',
      user_surname: localStorage.user_surname || '',
      student_id: localStorage.user_id || null,
      ticket_request: localStorage.user_request || '',
    },
    ticketData: {},
    hasStudentTicket: false,
    isRegistrationAlertVisible: false,
  }),
})