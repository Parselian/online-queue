<template>
  <v-form
    @submit.prevent="validate"
    ref="form"
  >
  <div class="auth-form__fields">

    <v-text-field
      v-model="store.resetPasswordFormData.login"
      :rules="[rules.login]"
      density="compact"
      type="text"
      clearable
      label="Логин"
      variant="underlined"
    />
    <v-text-field
      v-model="store.resetPasswordFormData.password"
      :rules="[rules.password]"
      density="compact"
      clearable
      type="password"
      label="Новый пароль"
      variant="underlined"
    />
    <v-text-field
      v-model="store.resetPasswordFormData.confirmPassword"
      :rules="[rules.confirmPassword]"
      density="compact"
      clearable
      type="password"
      variant="underlined"
      label="Подтверждение пароля"
      />
  </div>


    <div class="auth-form__controls">
      <v-btn
        type="submit"
        block
        color="#17A0FF"
        flat
        class="auth-form__control"
      >
        Обновить пароль
      </v-btn>
      <v-btn
        block
        flat
        variant="outlined"
        color="#17A0FF"
        @click="router.push('/login')"
        class="auth-form__control"
      >
        Войти
      </v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
  import {ref, unref} from 'vue'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { updatePassword } from '@/components/AuthForm/features/auth'
  import { loginValidation, passwordValidation} from '@/constants/regexRules'
  import router from '@/router'

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