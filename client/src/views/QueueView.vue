<template>
  <DefaultLayout>
    <h1
      v-if="!store.isOpenedTicketExists"
      class="queue__title">У вас нет активного тикета</h1>
    <div
      v-else
      class="queue-ticket"
    >
      <div class="queue-ticket__label">Ваш талон:</div>
      <h1 class="queue-ticket__title">{{ store.openedTicketData.ticket_abbreviation }}</h1>
      <div class="queue-ticket__position">
	<b style="color:red">Внимание:</b> число в талоне НЕ показывает твою позицию в очереди. Не пугайся :)
      <!--  <b>Поизиция в очереди:</b> {{ store.queueAmount }} -->
      </div>
    </div>

    <template #controls>
      <CreateTicketForm v-if="!store.isOpenedTicketExists"/>

      <template v-else>
        <v-btn
          block
          @click="getTicket"
          color="light-blue"
        >
          Обновить
        </v-btn>
      </template>
      <v-btn
        class="queue__button--sessions"
        block
        variant="outlined"
        @click="router.push('/session')"
        color="light-blue"
      >
        к выбору сессии
      </v-btn>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
  import router from '@/router'

  import {useCreateTicketForm} from '@/components/queue/CreateTicketForm/features/useCreateTicketForm'
  import {useQueueStore} from '@/stores/useQueueStore'
  import CreateTicketForm from '@/components/queue/CreateTicketForm/CreateTicketForm.vue'

  if (!localStorage.selected_session_id) router.push('/session')

  const store = useQueueStore()
  const {getTicket} = useCreateTicketForm()

  getTicket()

  // setInterval(async () => {
  //   if (!localStorage.user_id) return
  //   await getTicket()
  //   console.log('queue updated')
  // }, 10000)
</script>

<style>
  @import "@/views/styles/queueView/queue-view.scss";
</style>
