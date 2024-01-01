<template>
  <AuthLayout>
    <RegistrationForm/>
  </AuthLayout>
</template>

<script setup lang="ts">
  import AuthLayout from '@/layouts/Auth/AuthLayout.vue'
  import RegistrationForm from '@/components/RegistrationForm/RegistrationForm.vue'
</script>

<style scoped lang="scss">
  @import '@/views/styles/login-view.scss';
</style>