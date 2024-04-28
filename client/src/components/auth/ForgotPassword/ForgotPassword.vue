<template>
  <v-form
    @submit.prevent="validate"
    ref="form"
  >
    <h2 class="auth-form__title">Забыли пароль?</h2>
    <v-text-field
      v-model="store.resetPasswordFormData.login"
      :rules="[rules.login]"
      density="compact"
      type="text"
      clearable
      label="Логин"
    />
    <v-text-field
      v-model="store.resetPasswordFormData.password"
      :rules="[rules.password]"
      density="compact"
      clearable
      type="password"
      label="Новый пароль"
    />
    <v-text-field
      v-model="store.resetPasswordFormData.confirmPassword"
      :rules="[rules.confirmPassword]"
      density="compact"
      clearable
      type="password"
      label="Подтверждение пароля"
    />

    <v-btn
      type="submit"
      block
      class="mt-2"
      :color="'black'"
    >
      Обновить пароль
    </v-btn>

    <div class="auth-form-footer">
      <RouterLink
        :to="'/login'"
        class="auth-form-footer__link"
      >
        Войти
      </RouterLink>
    </div>
  </v-form>
</template>

<script setup lang="ts">
  import {ref, unref} from 'vue'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { updatePassword } from '@/components/AuthForm/features/auth'
  import { loginValidation, passwordValidation} from '@/constants/regexRules'

  const store = useAuthStore()

  const rules = ref({
    login: (v: string) => loginValidation.test(v) || 'Размер логина: 6 - 20 лат. символов/цифр',
    password: (v: string) => passwordValidation.test(v) || '8-16 лат. символов + цифр',
    confirmPassword: (v: string) => unref(store.resetPasswordFormData).password === v || 'Пароли не совпадают'
  })

  const form = ref()

  const validate = async () => {
    const {valid} = await form.value.validate()

    if (valid) await updatePassword(form)
  }
</script>

<style scoped lang="scss">
  @import '@/components/AuthForm/scss/authForm/auth-form.scss';
</style>