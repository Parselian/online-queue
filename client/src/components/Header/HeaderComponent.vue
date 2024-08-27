<template>
  <header class="header">
    <v-btn
      @click="router.go(-1)"
      icon="custom:arrowLeft"
      variant="text"
      size="compact"
      class="header__back"
    >
    </v-btn>
    <div class="header__profile">
      <span class="header__name">{{ props.username }}</span>
      <div class="header__position">{{ position }}</div>
      <v-icon
        class="header__photo"
        icon="custom:userStub"
      />
    </div>
    <v-btn
      class="header__button"
      icon="custom:logout"
      size="compact"
      variant="text"
      @click="logout()"
    >
    </v-btn>
  </header>
</template>

<script setup lang="ts">
  import router from '@/router'
  import { computed } from 'vue'
  import { useAuthStore } from '@/stores/useAuthStore'

  const props = defineProps<{
    username: string
  }>()

  const logout = () => {
    localStorage.clear()
    return router.push('/login')
  }

  const {isUserAdmin} = useAuthStore()

  const position = computed(() => isUserAdmin ? 'Администратор' : 'Студент')

  const welcomePhrase = computed(() => `Здравствуйте, ${props.username}!`)
</script>

<style scoped lang="scss">
  @import '@/components/Header/styles/header.scss';
</style>