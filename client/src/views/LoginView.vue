<template>
  <AuthLayout>
    <v-sheet
      :elevation="5"
      class="login-form"
    >
      <h2 class="login-form__title">Авторизация</h2>
      <v-form @submit.prevent>
        <v-text-field
          v-model="authData.login"
          density="compact"
          label="Логин"
        />
        <v-text-field
          v-model="authData.password"
          density="compact"
          label="Пароль"
        />
        <v-btn
          @click="login"
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

  const authData = ref<Record<any, unknown>>({
    login: '',
    password: ''
  })

  const login = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/login', {params: {login: unref(authData).login, password: unref(authData).password}})

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