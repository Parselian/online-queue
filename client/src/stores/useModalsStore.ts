import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalsStore = defineStore('modals', () => {
  const isModalOpen = ref(false)

  function toggleModal() {
    isModalOpen.value = !isModalOpen.value
  }

  return { isModalOpen, toggleModal }
})
