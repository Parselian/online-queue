<template>
  <DefaultLayout>
    <h1 class="queue__title">У вас нет активного талона</h1>
<!-- <CurrentClient
      :clientId="'L14'"
      :clientName="'Ярослав Мишустин'"
      :clientGroup="'0312'"
      :clientQuestion="'Пересдача контрольной'"
    /> -->
    <div class="queue-registration">
      <h4 class="queue-registration__title">Заполните форму:</h4>
      <div class="queue-registration__form queue-registration-form">
        <v-text-field
          v-model="queueFormData.user_name"
          density="compact"
          variant="underlined"
          label="Ваше имя"
        />
        <v-text-field
          v-model="queueFormData.user_surname"
          density="compact"
          variant="underlined"
          label="Ваша фамилия"
        />
        <v-text-field
        v-model="queueFormData.user_request"
          density="compact"
          variant="underlined"
          label="Ваш запрос"
        />
        <v-btn
          @click="createQueueTicket"
          type="submit"
          block
          class="mt-2"
          :color="'black'"
        >
          Создать талон
        </v-btn>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
import router from '@/router';
  import { ref } from 'vue'

  if (!localStorage.selected_session_id) router.push('/session')

  const queueFormData = ref({
    user_name: localStorage.user_name || '',
    user_surname: localStorage.user_surname || '',
    user_request: localStorage.user_request || '',
  })

  const createQueueTicket = () => {
    console.log('hehe');
  }
</script>

<style>
  @import "@/views/styles/queueView/queue-view.scss";
</style>
