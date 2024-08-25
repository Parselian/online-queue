<template>
  <div class="home">
    <div class="home-bg">
      <v-icon
        class="home-bg__top"
        icon="custom:topWaves"
      />
      <v-icon
        class="home-bg__bottom"
        icon="custom:bottomWaves"
      />
    </div>
    <div class="home__welcome">
      <v-icon
        class="home__logo"
        icon="custom:logo"
      />
      <div class="home__subtitle">Your personal time-saver</div>
    </div>

    <div>
      <v-btn
        block
        class="home__control home__control--auth"
        flat
        @click="router.push('/login')"
      >
        Войти
      </v-btn>
      <v-btn
        block
        class="home__control home__control--register"
        flat
        variant="outlined"
        color="#fff"
        @click="router.push('/register')"
      >
        Зарегестрироваться
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router'

  // router.push('/admin/queue')
</script>

<style scoped lang="scss">
  @import "@/views/styles/homeView/home-view";
</style>