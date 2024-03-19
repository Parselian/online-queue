<template>
  <AuthLayout>
    <v-sheet
      :elevation="5"
      class="login-form"
    >
      <h2 class="login-form__title">Авторизация</h2>
      <LoginForm/>
    </v-sheet>
  </AuthLayout>
</template>

<script setup lang="ts">
  import AuthLayout from '@/layouts/Auth/AuthLayout.vue'
  import LoginForm from '@/components/LoginForm/LoginForm.vue'
</script>

<style scoped lang="scss">
  @import '@/views/styles/loginView/login-view.scss';
</style>