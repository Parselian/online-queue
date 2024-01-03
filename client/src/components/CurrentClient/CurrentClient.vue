<template>
  <div class="current-client">
    <div class="current-client__col">
      <span class="current-client__id">
        {{ clientId }}
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
        <b>Вопрос:</b> {{ clientQuestion }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

  const props = defineProps<{
    clientId: string,
    clientName: string,
    clientGroup: string | number,
    clientQuestion: string
  }>()
</script>

<style scoped lang="scss">
  @import "@/components/CurrentClient/styles/current-client.scss";
</style>