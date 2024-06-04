<template>
  <DefaultLayout>
    <h1
      v-if="!store.isCurrentClientExists"
      class="queue__title"
    >
      Очередь пуста
    </h1>

    <CurrentClient
      v-else
      :ticketId="store.currentClientInfo.ticketAbbreviation"
      :clientName="store.currentClientInfo.studentName"
      :clientGroup="store.currentClientInfo.studentGroup"
      :ticketRequest="store.currentClientInfo.ticketRequest"
    />

    <template #controls>
      <template v-if="store.isCurrentClientExists">
        <div class="queue-controls__estimate">
          <b>Осталось студентов:</b> {{ store.queueAmount }}
        </div>
        <v-btn
          @click="updateQueue"
          color="light-blue"
          class="queue__button"
        >
          Следующий по очереди
        </v-btn>
      </template>
      <v-btn
        @click="updateQueue(false)"
        color="light-blue"
        variant="outlined"
        class="queue__button"
      >
        Обновить кол-во
      </v-btn>
      <v-btn
        v-if="store.isCurrentClientExists"
        @click="openTicketsList"
        color="light-blue"
        class="queue__button"
      >
        Список тикетов
      </v-btn>
      <v-btn
        @click="router.push('/admin/session')"
        variant="outlined"
        color="light-blue"
        class="queue__button"
      >
        к выбору сессии
      </v-btn>
      <v-btn
        @click="clearQueue"
        color="pink"
        class="queue__button"
      >
        Очистить очередь
      </v-btn>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import CurrentClient from '@/components/CurrentClient/CurrentClient.vue'
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
  import router from '@/router'

  import { useQueueStore } from "@/stores/useQueueStore"
  import { useAuthStore } from '@/stores/useAuthStore'
  import { useQueueAdminView } from '@/views/features/useQueueAdminView/useQueueAdminView'

  import { useModalsStore } from '@/stores/useModalsStore'

  const {toggleTicketsListModal} = useModalsStore()

  const authStore = useAuthStore()
  if ((!authStore.isUserAdmin && !localStorage.selected_session_id) || !authStore.isUserAdmin) {
    router.push('/session')
  }
  if (authStore.isUserAdmin && !localStorage.selected_session_id) router.push('/admin/session')

  const store = useQueueStore()
  const {
    clearQueue,
    updateQueue,
    getNextClient,
    getQueueAmount,
    getAllTickets,
  } = useQueueAdminView()

  getNextClient()
  getQueueAmount()

  async function openTicketsList() {
    await getAllTickets()
    toggleTicketsListModal()
  }

  setInterval(async () => {
    // if (!localStorage.user_id) return
    // await getNextClient()
    // await getQueueAmount()
    // console.log('queue updated')
  }, 1000)
</script>

<style>
  @import "@/views/styles/queueAdminView/queue-view.scss";
</style>