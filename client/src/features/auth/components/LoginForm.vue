<template>
  <v-form @submit.prevent="login">
    <v-text-field
      v-model="store.login"
      :rules="[store.rules.required]"
      density="compact"
      type="text"
      clearable
      label="Логин"
    />
    <v-text-field
      v-model="store.password"
      :rules="[store.rules.min, store.rules.required]"
      density="compact"
      type="password"
      clearable
      label="Пароль"
    />
    <v-btn
      :disabled="!store.isFormFilled"
      type="submit"
      block
      class="mt-2"
      :color="'black'"
    >
      Войти
    </v-btn>
    <div class="login-form-footer">
      <span class="login-form-footer__label">
        Нет аккаунта?
      </span>
      <RouterLink
        :to="'/register'"
        class="login-form-footer__link"
      >
        Зарегестрироваться
      </RouterLink>
    </div>
  </v-form>
</template>

<script setup lang="ts">
  import { useLoginStore } from '@/features/auth/stores/loginStore'
  import {login} from '@/features/auth/api/login'

  const store = useLoginStore()
</script>

<style scoped lang="scss">
  @import '@/features/auth/components/scss/loginForm/login-form.scss';
</style>