import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalsStore = defineStore('modals', () => {
  const isSupportModalOpen = ref(false)

  function toggleSupportModal() {
    isSupportModalOpen.value = !isSupportModalOpen.value
  }

  return { isSupportModalOpen, toggleSupportModal }
})
