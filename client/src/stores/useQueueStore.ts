import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQueueStore = defineStore('queue', () => {
  const sessionName = ref()
  const ticketRequest = ref()
  const isOpenedTicketExists = ref(false)
  const openedTicketData = ref()

  const setSessionName = (name: string) => sessionName.value = name
  const setIsOpenedTicketExists = (flag: boolean) => isOpenedTicketExists.value = flag
  const setOpenedTicketData = (data: Record<string, unknown>) => openedTicketData.value = data

  return {
    isOpenedTicketExists,
    openedTicketData,
    sessionName,
    setIsOpenedTicketExists,
    setOpenedTicketData,
    setSessionName,
    ticketRequest
  }
})