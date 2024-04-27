import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useSessionsStore = defineStore('sessions', () => {
  const sessionsList = ref([])
  const subjectsList = ref([])
  const selectedSessionId = ref()
  const selectedSubjectId = ref()
  const newSessionName = ref('')

  const setSessionsList = (sessions: []) => sessionsList.value = sessions
  const setSubjectsList = (subjects: []) => subjectsList.value = subjects
  const setSelectedSubjectId = (id: number) => selectedSubjectId.value = id
  const clearSelectedSessionId = () => selectedSessionId.value = null

  const getSelectedSessionId = () => selectedSessionId.value

  return {
    clearSelectedSessionId,
    getSelectedSessionId,
    newSessionName,
    sessionsList,
    subjectsList,
    selectedSessionId,
    selectedSubjectId,
    setSessionsList,
    setSelectedSubjectId,
    setSubjectsList,
  }
})