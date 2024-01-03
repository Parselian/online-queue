<script setup lang="ts">
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
  import CurrentClient from '@/components/CurrentClient/CurrentClient.vue'
</script>

<template>
  <DefaultLayout>
    <CurrentClient
      :clientId="'L14'"
      :clientName="'Ярослав Мишустин'"
      :clientGroup="'0312'"
      :clientQuestion="'Пересдача контрольной'"
    />
  </DefaultLayout>
</template>
