<template>
  <DefaultLayout>
    <h1
      v-if="!isCurrentClientExist"
      class="queue__title">Очередь пуста</h1>
    <CurrentClient
      v-else
      :ticketId="currentClient.ticketAbbreviation"
      :clientName="currentClient.studentName"
      :clientGroup="currentClient.studentGroup"
      :ticketRequest="currentClient.ticketRequest"
    />
    <template
      #controls
    >
      <template
        v-if="isCurrentClientExist"
      >
        <div class="queue-controls__estimate">
          <b>Осталось студентов:</b> {{ queueAmount }}
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
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import CurrentClient from '@/components/CurrentClient/CurrentClient.vue'
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
  import router from '@/router'
  import axios from 'axios'
  import { computed, ref, unref } from 'vue'

  if (!localStorage.selected_session_id) router.push('/admin/session')

  const currentClient = ref<Record<any, any>>({})
  const isCurrentClientExist = computed(() => Object.keys(unref(currentClient)).length === 0 ? false : true)
  const queueAmount = ref<number>()

  const getNextClient = async () => {
    if (!localStorage.user_id) return
    try {
      const response = await axios.get('http://localhost:8080/api/get-next-order-ticket', {params: {
        student_id: localStorage.user_id,
        session_id: localStorage.selected_session_id
      }})

      const data = response.data

      /* If we didn`t receive ticket_id (data.id) we clear currentClient object and end this function */
      if (!data.id) return currentClient.value = {}

      currentClient.value = {
        ticketId: data.id || null,
        ticketAbbreviation: data.ticket_abbreviation || '',
        ticketRequest: data.ticket_request || '-',
        studentGroup: data.user_group || '-',
        studentName: `${data.user_name} ${data.user_surname}` || '-'
      }
      console.log(response);
    } catch (e) {
      console.error(e)
    }
  }
  getNextClient()

  const closeCurrentTicket = async () => {
    try {
      if (Object.keys(unref(currentClient)).length > 0) {
        await axios.put('http://localhost:8080/api/close-ticket', {ticket_id: unref(currentClient).ticketId})
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updateQueue = async () => {
    try {
      await closeCurrentTicket()
      await getNextClient()
      await getQueueAmount()
    } catch (e) {
      console.error(e)
    }
  }

  const getQueueAmount = async () => {
    if (!localStorage.user_id) return
    try {
      const response = await axios.get('http://localhost:8080/api/get-queue-tickets', {params: {session_id: localStorage.selected_session_id}})
      console.log(response);

      queueAmount.value = response.data.length
    } catch (e) {
      console.error(e)
    }
  }
  getQueueAmount()

  setInterval(async () => {
    if (!localStorage.user_id) return
    await getNextClient()
    await getQueueAmount()
    console.log('queue updated')
  }, 10000)
</script>

<style>
  @import "@/views/styles/queueAdminView/queue-view.scss";
</style>
