<template>
  <header class="header">
    <div class="header__welcome">
      {{ welcomePhrase }}
    </div>
  </header>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    username: string
  }>()

  const welcomePhrase = computed(() => `Здравствуйте, ${props.username}!`)
</script>

<style scoped lang="scss">
  @import '@/components/Header/styles/header.scss';
</style>