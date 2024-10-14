import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalsStore = defineStore('modals', () => {
  const isSupportModalOpen = ref(false)
  const isTicketsListModalOpen = ref(false)
  const isVersionInfoModalOpen = ref(!localStorage.isVersionInfoAlreadyBeenShown)
  function toggleSupportModal() {
    isSupportModalOpen.value = !isSupportModalOpen.value
  }
  function toggleTicketsListModal() {
    isTicketsListModalOpen.value = !isTicketsListModalOpen.value
  }

  function closeVersionInfoModal() {
    isVersionInfoModalOpen.value = false
    localStorage.isVersionInfoAlreadyBeenShown = true
  }

  return {
    isSupportModalOpen,
    isTicketsListModalOpen,
    toggleSupportModal,
    toggleTicketsListModal,
    closeVersionInfoModal,
    isVersionInfoModalOpen
  }
})
