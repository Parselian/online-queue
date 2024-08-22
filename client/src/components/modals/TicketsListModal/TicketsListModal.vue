<template>
  <v-overlay
    class="tickets-list-modal align-center justify-center"
    v-model="store.isTicketsListModalOpen"
  >
    <v-card
      class="tickets-list-modal__container"
    >
      <div class="tickets-list-modal__cards">
        <div
          class="tickets-list-modal__card tickets-list-modal-card"
          v-for="(ticket, index) in queueStore.queueTicketsList"
          :key="ticket.ticket_id"
        >
        <div class="tickets-list-modal-card__info">
          <span class="tickets-list-modal-card__id">
            Талон: <b>{{ ticket.ticket_abbreviation }}</b>
          </span>
          <span>
            <span class="tickets-list-modal-card__name">
            ФИО: {{ ticket.user_name  }} {{ ticket.user_surname }}
          </span>
          <span class="tickets-list-modal-card__group">
            Группа: {{ ticket.user_group }}
          </span>
          <span class="tickets-list-modal-card__request">
            Вопрос: {{  ticket.ticket_request }}
          </span>  
          </span>
        </div>
        <div class="tickets-list-modal-card__actions">
          <v-btn
            @click="closeTicket"
            :data-value="ticket.id"
            size="small"
            color="green"
          >
            sbm
          </v-btn>
          <v-btn
            @click="punishLatePerson"
            :data-value="ticket.id"
            size="small"
            color="orange"
            >
            end
          </v-btn>
        </div>
      </div>
      </div>
      
      <div class="tickets-list-modal__controls">
        <v-btn
          @click="updateTicketsList"
          class="tickets-list-modal__update"
          color="blue"
        >
          Обновить
        </v-btn>
        <v-btn
          color="black"
          @click="store.toggleTicketsListModal"
          class="tickets-list-modal__close"
        >
          Закрыть
        </v-btn>
      </div>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
  import { useModalsStore } from '@/stores/useModalsStore'
  import { useQueueStore } from '@/stores/useQueueStore'
  import { useQueueAdminView } from '@/views/features/useQueueAdminView/useQueueAdminView'

  const queueStore = useQueueStore()

  const {
    closeCurrentTicket,
    updateQueue,
    getAllTickets,
    moveTicketToEnd,
  } = useQueueAdminView()
  
  const store = useModalsStore();

  async function closeTicket(e: any) {     
    await closeCurrentTicket(e.currentTarget.dataset.value)
    await updateQueue(false)
    await getAllTickets()
  }

  async function punishLatePerson(e: any) {
    await moveTicketToEnd(e.currentTarget.dataset.value)
    await updateQueue(false)
    await getAllTickets()
  }

  async function updateTicketsList() {
    await updateQueue(false),
    await getAllTickets();
  }
</script>

<style lang="scss" scoped>
  @import "@/components/modals/TicketsListModal/scss/tickets-list-modal";
</style>