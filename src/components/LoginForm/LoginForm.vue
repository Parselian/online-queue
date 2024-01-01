<template>
  <v-sheet
    :elevation="5"
    class="login-form"
  >
    <h2 class="login-form__title">Авторизация</h2>
    <v-form @submit.prevent>
      <v-text-field
        v-model="login"
        label="Логин"
      />
      <v-text-field
        v-model="login"
        label="Пароль"
      />
      <v-btn
        type="submit"
        block
        class="mt-2"
        :color="'black'"
      >
        Войти
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const login = ref<string>('')
  const rules = ref<any>({
      loginField: [
        value => {
          if (value) return value

          return 'Введите желаемый логин.'
        }
      ]
    })
</script>

<style scoped lang="scss">
  @import '@/components/LoginForm/styles/login-form.scss';
</style>