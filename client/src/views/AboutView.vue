<template>
  <DefaultLayout>
    <CurrentClient
      :clientId="'L14'"
      :clientName="'Ярослав Мишустин'"
      :clientGroup="'0312'"
      :clientQuestion="'Пересдача контрольной'"
    />
    <h1>У вас нет активной сессии!</h1>
    <v-select
      density="compact"
      label="Желаемая сессия"
    >

    </v-select>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
