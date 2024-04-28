<template>
  <AuthLayout>
    <v-sheet
      :elevation="5"
      class="login-form"
    >
      <ForgotPassword v-if="route.name === 'resetPassword'" />
      <AuthForm v-else/>
    </v-sheet>
  </AuthLayout>
</template>

<script setup lang="ts">
  import {useRoute} from 'vue-router'
  import AuthLayout from '@/layouts/Auth/AuthLayout.vue'
  import AuthForm from '@/components/AuthForm/AuthForm.vue'
  import ForgotPassword from '@/components/auth/ForgotPassword/ForgotPassword.vue'

  const route = useRoute()
</script>

<style scoped lang="scss">
  @import '@/views/styles/authView/auth-view.scss';
</style>