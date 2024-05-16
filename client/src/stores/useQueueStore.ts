import {
  computed,
  ref,
  unref,
} from 'vue'
import { defineStore } from 'pinia'

export const useQueueStore = defineStore('queue', () => {
  const sessionName = ref()
  const ticketRequest = ref('')
  const isOpenedTicketExists = ref(false)
  const openedTicketData = ref()
  const currentClientInfo = ref()
  const queueAmount = ref()

  const setSessionName = (name: string) => sessionName.value = name
  const setIsOpenedTicketExists = (flag: boolean) => isOpenedTicketExists.value = flag
  const setOpenedTicketData = (data: Record<string, unknown>) => openedTicketData.value = data
  const setCurrentClientInfo = (clientInfo: Record<string, unknown>) => currentClientInfo.value = clientInfo
  const setQueueAmount = (amount: number) => queueAmount.value = amount
  const resetTicketRequest = () => ticketRequest.value = ''

  const isCurrentClientExists = computed(() => !!unref(currentClientInfo)?.ticketId)

  return {
    currentClientInfo,
    isCurrentClientExists,
    isOpenedTicketExists,
    openedTicketData,
    sessionName,
    resetTicketRequest,
    setCurrentClientInfo,
    setIsOpenedTicketExists,
    setOpenedTicketData,
    setSessionName,
    setQueueAmount,
    queueAmount,
    ticketRequest
  }
})