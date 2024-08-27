<template>
  <AuthLayout>
    <template #title>{{ title }}</template>
    <template #subtitle>{{ subtitle }}</template>
    <template #default>
      <ForgotPassword v-if="route.name === 'resetPassword'" />
      <AuthForm :submitText="submitText" v-else/>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
  import {useRoute} from 'vue-router'
  import AuthLayout from '@/layouts/Auth/AuthLayout.vue'
  import AuthForm from '@/components/AuthForm/AuthForm.vue'
  import { useAuthStore } from '@/stores/useAuthStore'
  import ForgotPassword from '@/components/auth/ForgotPassword/ForgotPassword.vue'
  import { computed } from 'vue'

  const route = useRoute()
  const store = useAuthStore()

  const title = computed(() => store.isActiveLoginRoute ? 'С возвращением!' : store.isActiveResetPasswordRoute ? 'Забыли пароль?' : 'Регистрация')
  const subtitle = computed(() => store.isActiveLoginRoute ? 'Для продолжения необходимо авторизоваться' : store.isActiveResetPasswordRoute ? 'Просто придумай новый :)' : 'Ты не пожалеешь! ;)')
  const submitText = computed(() => store.isActiveLoginRoute ? 'Войти' : 'Зарегистрироваться')

</script>