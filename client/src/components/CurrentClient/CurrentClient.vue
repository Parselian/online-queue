<template>
  <div class="current-client">
    <div class="current-client__col">
      <span class="current-client__id">
        {{ ticketId }}
      </span>
    </div>
    <div class="current-client__col">
      <span class="current-client__info">
        <b>Студент:</b> {{ clientName }}
      </span>
      <span class="current-client__info">
        <b>Группа:</b> {{ clientGroup }}
      </span>
      <span class="current-client__info">
        <b>Вопрос:</b> {{ ticketRequest }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

  defineProps<{
    ticketId: string,
    clientName: string,
    clientGroup: string | number,
    ticketRequest: string
  }>()
</script>

<style scoped lang="scss">
  @import "@/components/CurrentClient/styles/current-client.scss";
</style>