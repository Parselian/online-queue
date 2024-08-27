<template>
  <DefaultLayout>
    <h1
      v-if="!store.isOpenedTicketExists"
      class="queue__title">У вас нет активного тикета
    </h1>
    <div v-else class="ticket-summary">
      <v-icon
        icon="custom:ticketCircle"
        class="ticket-summary__icon"
      />
      <div class="ticket-summary__label">Ваш талон:</div>
      <div class="ticket-summary__id">{{ store.openedTicketData.ticket_abbreviation }}</div>
      <div class="ticket-summary__estimate">
        Позиция в очереди: <br/> <b>{{ store.studentQueuePosition }}</b>
      </div>
    </div>
    <div class="queue__attention">
      <b style="color: orange">Внимание:</b> <br/> число в талоне <b>НЕ</b> показывает твою позицию в очереди. Не пугайся :)
    </div>
    <!-- <div
      v-else
      class="queue-ticket"
    >
      <div class="queue-ticket__label">Ваш талон:</div>
      <h1 class="queue-ticket__title">{{ store.openedTicketData.ticket_abbreviation }}</h1>
      <div class="queue-ticket__position">
      <hr/>
      <b>Позиция в очереди:</b> {{ store.studentQueuePosition }}
      </div>
    </div> -->
    <div
      v-if="store.isOpenedTicketExists"
      class="queue__controls"
    >
      <v-btn
        block
        @click="update"
        flat
        class="queue__button--refresh"
      >
        Обновить
      </v-btn>
      <v-btn
        class="queue__button--sessions"
        block
        variant="outlined"
        @click="router.push('/session')"
      >
        к выбору сессии
      </v-btn>
    </div>
    <template v-if="!store.isOpenedTicketExists" #controls>
      <CreateTicketForm />
    </template>
    <template v-else #customControls>
      <div></div>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
  import router from '@/router'

  import {useCreateTicketForm} from '@/components/queue/CreateTicketForm/features/useCreateTicketForm'
  import {useQueueStore} from '@/stores/useQueueStore'
  import CreateTicketForm from '@/components/queue/CreateTicketForm/CreateTicketForm.vue'
  import { useQueueAdminView } from '@/views/features/useQueueAdminView/useQueueAdminView'

  if (!localStorage.selected_session_id) router.push('/session')

  const {
    getStudentQueuePosition,
  } = useQueueAdminView()

  const store = useQueueStore()
  const {getTicket} = useCreateTicketForm()

  async function update() {
    await getTicket()
    await getStudentQueuePosition()
  }

  update()

  // setInterval(async () => {
  //   if (!localStorage.user_id) return
  //   await getTicket()
  //   console.log('queue updated')
  // }, 10000)
</script>

<style>
  @import "@/views/styles/queueView/queue-view.scss";
</style>
