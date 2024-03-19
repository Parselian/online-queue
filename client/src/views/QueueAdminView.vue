<template>
  <DefaultLayout>
    <h1
      v-if="!store.isCurrentClientExist"
      class="queue__title">
      Очередь пуста
    </h1>

    <CurrentClient
      v-else
      :ticketId="store.currentClient.ticketAbbreviation"
      :clientName="store.currentClient.studentName"
      :clientGroup="store.currentClient.studentGroup"
      :ticketRequest="store.currentClient.ticketRequest"
    />

    <template
      #controls
    >
      <template
        v-if="store.isCurrentClientExist"
      >
        <div class="queue-controls__estimate">
          <b>Осталось студентов:</b> {{ store.queueAmount }}
        </div>
        <v-btn
          @click="updateQueue()"
          color="black"
          class="queue__button"
        >
          Следующий по очереди
        </v-btn>
      </template>
      <v-btn
        v-else
        @click="updateQueue()"
        color="black"
        class="queue__button"
      >
        Обновить
      </v-btn>
      <v-btn
        class="queue__button"
        @click="router.push('/admin/session')"
        color="black"
      >
        к выбору сессии
      </v-btn>
      <v-btn
        class="queue__button"
        @click="clearQueue()"
        color="red"
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

  import { useQueueAdminStore } from "@/stores/useQueueAdminStore"

  import {
    getNextClient,
    updateQueue,
    getQueueAmount,
    clearQueue
  }  from './helpers/queueAdminView/queueAdminView'

  if (!localStorage.selected_session_id) router.push('/admin/session')

  const store = useQueueAdminStore()

  getNextClient()
  getQueueAmount()

  // setInterval(async () => {
  //   if (!localStorage.user_id) return
  //   await getNextClient()
  //   await getQueueAmount()
  //   console.log('queue updated')
  // }, 10000)
</script>

<style>
  @import "@/views/styles/queueAdminView/queue-view.scss";
</style>
