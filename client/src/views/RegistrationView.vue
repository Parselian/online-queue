<template>
  <AuthLayout>
    <v-sheet
      :elevation="5"
      class="registration-form"
    >
      <h2 class="registration-form__title">Регистрация</h2>
      <RegistrationForm />
    </v-sheet>
  </AuthLayout>
</template>

<script setup lang="ts">
  import AuthLayout from '@/layouts/Auth/AuthLayout.vue'
  import RegistrationForm from '@/components/RegistrationForm/RegistrationForm.vue'
</script>

<style scoped lang="scss">
  @import '@/views/styles/registrationView/registration-view.scss';
</style>