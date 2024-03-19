import { defineStore } from "pinia"

export const useQueueAdminStore = defineStore('queueAdmin', {
  state: () => ({
    currentClient:{
      ticketId: null,
      ticketAbbreviation: '-',
      ticketRequest: '-',
      studentGroup: '-',
      studentName: '-'
    },
    selectedSessionId: localStorage.selected_session_id || null,
    queueAmount: null,
  }),
  getters: {
    isCurrentClientExist: (state) => state.currentClient.ticketId ? true : false
  }
})