import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useSessionsStore = defineStore('sessions', () => {
  const sessionsList = ref([])
  const selectedSessionId = ref()
  const newSessionName = ref('')

  const setSessionsList = (sessions: []) => sessionsList.value = sessions

  return {
    newSessionName,
    sessionsList,
    selectedSessionId,
    setSessionsList,
  }
})