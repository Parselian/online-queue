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
        v-else
        @click="updateQueue(false)"
        color="light-blue"
        class="queue__button"
      >
        Обновить
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

  import { useQueueAdminView } from '@/views/features/useQueueAdminView/useQueueAdminView'

  if (!localStorage.selected_session_id) router.push('/admin/session')

  const store = useQueueStore()
  const {
    clearQueue,
    updateQueue,
    getNextClient,
    getQueueAmount
  } = useQueueAdminView()

  getNextClient()
  getQueueAmount()

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