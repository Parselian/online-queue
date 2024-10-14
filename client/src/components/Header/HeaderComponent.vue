<template>
  <header class="header">
    <div class="header__welcome">
      {{ welcomePhrase }}
    </div>
    <v-btn
      class="header__button"
      :size="'compact'"
      @click="logout()"
    >
      Выйти
    </v-btn>
  </header>
</template>

<script setup lang="ts">
  import router from '@/router'
  import { computed } from 'vue'

  const props = defineProps<{
    username: string
  }>()

  const logout = () => {
    localStorage.clear()
    return router.push('/login')
  }


  const welcomePhrase = computed(() => `Здравствуйте, ${props.username}!`)
</script>

<style scoped lang="scss">
  @import '@/components/Header/styles/header.scss';
</style>