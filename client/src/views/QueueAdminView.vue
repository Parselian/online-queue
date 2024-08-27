<template>
  <DefaultLayout>
    <h1
      v-if="!store.isCurrentClientExists"
      class="queue__title"
    >
      <v-icon
        icon="custom:ticketCircle"
        class="queue__icon queue__icon--empty"
      />
      👀
      <br />
      Похоже очередь пуста...
    </h1>

    <div class="ticket-summary">
      <v-icon
        icon="custom:ticketCircle"
        class="ticket-summary__icon"
      />
      <div class="ticket-summary__label">Текущий талон:</div>
      <div class="ticket-summary__id">{{ store.currentClientInfo.ticketAbbreviation }}</div>
      <div class="ticket-summary__estimate">
        Осталось студентов: <br/> <b>{{ store.queueAmount }}</b>
      </div>
    </div>

    <ul class="ticket-info">
      <li class="ticket-info__item ticket-info-item">
        <span class="ticket-info-item__col">Имя:</span>
        <span class="ticket-info-item__col">{{ store.currentClientInfo.studentName }}</span>
      </li>
      <li class="ticket-info__item ticket-info-item">
        <span class="ticket-info-item__col">Группа:</span>
        <span class="ticket-info-item__col">{{ store.currentClientInfo.studentGroup }}</span>
      </li>
      <li class="ticket-info__item ticket-info-item">
        <span class="ticket-info-item__col">Вопрос:</span>
        <span class="ticket-info-item__col">{{ store.currentClientInfo.ticketRequest }}</span>
      </li>
    </ul>

    <!-- <CurrentClient
      v-else
      :ticketId="store.currentClientInfo.ticketAbbreviation"
      :clientName="store.currentClientInfo.studentName"
      :clientGroup="store.currentClientInfo.studentGroup"
      :ticketRequest="store.currentClientInfo.ticketRequest"
    /> -->
    <template #customControls>
      <div class="queue__controls">
        <div class="queue-controls__row">
          <template v-if="store.isCurrentClientExists">
            <!-- <div class="queue-controls__estimate">
              <b>Осталось студентов:</b> {{ store.queueAmount }}
            </div> -->
            <v-btn
              @click="updateQueue"
              flat
              size="large"
              class="queue__button queue__button--next"
            >
              Следующий
            </v-btn>
          </template>
          <v-btn
            @click="updateQueue(false)"
            color="white"
            variant="outlined"
            class="queue__button"
            icon="refresh"
          >
          </v-btn>
          <v-btn
            v-if="store.isCurrentClientExists"
            @click="openTicketsList"
            class="queue__button queue__button--list"
            variant="outlined"
            icon="formatlistbullet"
          >
          </v-btn>
        </div>
        <div class="queue-controls__row">
          <v-btn
            @click="router.push('/admin/session')"
            variant="outlined"
            block
            flat
            color="white"
            class="queue__button"
          >
            к выбору сессии
          </v-btn>
          <v-btn
            @click="clearQueue"
            color="pink"
            block
            flat
            class="queue__button"
          >
            Очистить очередь
          </v-btn>
        </div>
      </div>
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