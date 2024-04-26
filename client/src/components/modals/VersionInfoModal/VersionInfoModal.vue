<template>
  <v-overlay
    class="version-info-modal align-center justify-center"
    v-model="store.isVersionInfoModalOpen"
  >
    <v-card class="version-info-modal__card align-center justify-center">
      <h2 class="version-info-modal__title">Сервис "Онлайн очередь" ver 1.0.0</h2>
      <div class="version-info-modal__scroll">
        <span class="version-info-modal__text">Что добавлено:</span>
        <ul class="version-info-modal__list version-info-modal-list">
          <li class="version-info-modal-list__item">функционал авторизации;</li>
          <li class="version-info-modal-list__item">функционал создания тикетов (клиент);</li>
          <li class="version-info-modal-list__item">функционал управления созданными тикетами (админ);</li>
          <li class="version-info-modal-list__item">функционал создания/удаления сессий (админ);</li>
        </ul>
        <hr class="version-info-modal__separator"/>
        <span class="version-info-modal__text">Обновления следующей версии:</span>
        <ul class="version-info-modal__list version-info-modal-list">
          <li class="version-info-modal-list__item">Редактирование персональных данных. Управление паролями (личный кабинет);</li>
          <li class="version-info-modal-list__item">автообновление статусов по активным тикетам и сессиям (клиент + админ);</li>
          <li class="version-info-modal-list__item">переработка дизайна;</li>
        </ul>
      </div>

      <v-btn
        @click="store.closeVersionInfoModal"
        block
        color="black"
        class="version-info-modal__close"
      >
        Закрыть
      </v-btn>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
  import {useModalsStore} from '@/stores/useModalsStore'

  const store = useModalsStore()
</script>

<style scoped lang="scss">
  @import "@/components/modals/VersionInfoModal/styles/version-info-modal";
</style>