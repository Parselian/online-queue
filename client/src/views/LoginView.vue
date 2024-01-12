<template>
  <AuthLayout>
    <v-sheet
      :elevation="5"
      class="login-form"
    >
      <h2 class="login-form__title">Авторизация</h2>
      <v-form v-model="isFormFilled" @submit.prevent="login">
        <v-text-field
          v-model="authData.login"
          :rules="[rules.required]"
          density="compact"
          clearable
          label="Логин"
        />
        <v-text-field
          v-model="authData.password"
          :rules="[rules.min, rules.required]"
          density="compact"
          type="password"
          clearable
          label="Пароль"
        />
        <v-btn
          :disabled="!isFormFilled"
          type="submit"
          block
          class="mt-2"
          :color="'black'"
        >
          Войти
        </v-btn>
      </v-form>
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
    </v-sheet>
  </AuthLayout>
</template>

<script setup lang="ts">
  import AuthLayout from '@/layouts/Auth/AuthLayout.vue'
  import router from '@/router'
  import axios from 'axios'
  import { unref } from 'vue'
  import { ref } from 'vue'

  const isFormFilled = ref(false)

  const authData = ref<Record<string, unknown>>({
    login: '',
    password: ''
  })

  const rules = ref({
    required: (value: string) => !!value || 'Required.',
    min: (v: string) => v.length >= 8 || 'Min 8 characters'
  })

  const login = async () => {
    try {
      if (Object.values(authData.value).includes('')) return false
      const response = await axios.get(`${import.meta.env.VITE_HOSTNAME}/api/login`, {params: {login: unref(authData).login, password: unref(authData).password}})

      localStorage.clear()
      localStorage.user_id = response.data.id
      localStorage.user_login = response.data.login
      localStorage.user_password = response.data.password
      localStorage.user_name = response.data.user_name
      localStorage.user_surname = response.data.user_surname
      localStorage.user_group = response.data.user_group
      localStorage.user_type = response.data.user_type

      if (localStorage.user_type == 2) return router.push('/admin/session')
      else return router.push('/session')

    } catch (e: any) {
      if (e.response.status === 453) alert('Неправильный логин или пароль!')
      console.error(e)
    }
  }
</script>

<style scoped lang="scss">
  @import '@/views/styles/loginView/login-view.scss';
</style>