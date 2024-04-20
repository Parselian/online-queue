<template>
  <AuthLayout>
    <v-sheet
      :elevation="5"
      class="login-form"
    >
      <h2 class="auth-form__title">Авторизация</h2>
      <AuthForm/>
    </v-sheet>
  </AuthLayout>
</template>

<script setup lang="ts">
  import AuthLayout from '@/layouts/Auth/AuthLayout.vue'
  // import LoginForm from '@/components/LoginForm/LoginForm.vue'
  import AuthForm from '@/components/AuthForm/AuthForm.vue';
</script>

<style scoped lang="scss">
  @import '@/views/styles/authView/auth-view.scss';
</style>