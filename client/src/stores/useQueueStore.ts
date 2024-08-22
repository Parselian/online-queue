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
  const studentQueuePosition = ref()
  const queueTicketsList = ref()

  const setQueueTicketsList = (list: any[]) => queueTicketsList.value = list
  const setSessionName = (name: string) => sessionName.value = name
  const setIsOpenedTicketExists = (flag: boolean) => isOpenedTicketExists.value = flag
  const setOpenedTicketData = (data: Record<string, unknown>) => openedTicketData.value = data
  const setCurrentClientInfo = (clientInfo: Record<string, unknown>) => currentClientInfo.value = clientInfo
  const setQueueAmount = (amount: number) => queueAmount.value = amount
  const setStudentQueuePosition = (position: number) => studentQueuePosition.value = position
  const resetTicketRequest = () => ticketRequest.value = ''

  const isCurrentClientExists = computed(() => !!unref(currentClientInfo)?.ticketId)

  return {
    currentClientInfo,
    isCurrentClientExists,
    isOpenedTicketExists,
    openedTicketData,
    sessionName,
    studentQueuePosition,
    resetTicketRequest,
    setCurrentClientInfo,
    setIsOpenedTicketExists,
    setOpenedTicketData,
    setQueueTicketsList,
    setSessionName,
    setQueueAmount,
    setStudentQueuePosition,
    queueAmount,
    ticketRequest,
    queueTicketsList,
  }
})