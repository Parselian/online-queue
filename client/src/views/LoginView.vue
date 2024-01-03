<template>
  <AuthLayout>
    <LoginForm/>
  </AuthLayout>
</template>

<script setup lang="ts">
  import AuthLayout from '@/layouts/Auth/AuthLayout.vue'
  import LoginForm from '@/components/LoginForm/LoginForm.vue'
</script>

<style scoped lang="scss">
  @import '@/views/styles/login-view.scss';
</style>