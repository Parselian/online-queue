<template>
  <AuthLayout>
    <v-sheet
      :elevation="5"
      class="registration-form"
    >
      <h2 class="registration-form__title">Регистрация</h2>
      <v-form @submit.prevent>
        <v-text-field
          v-model="newUser.login"
          density="compact"
          label="Логин"
        />
        <v-text-field
          v-model="newUser.user_name"
          density="compact"
          label="Имя"
        />
        <v-text-field
          v-model="newUser.user_surname"
          density="compact"
          label="Фамилия"
        />
        <v-text-field
          v-model="newUser.user_group"
          density="compact"
          label="Группа"
        />
        <v-text-field
          v-model="newUser.password"
          density="compact"
          :rules="[rules.min, rules.required]"
          label="Пароль"
        />
        <v-btn
          type="submit"
          block
          :color="'black'"
          class="mt-2"
          @click="createUser"
        >
          Зарегестрироваться
        </v-btn>
      </v-form>
      <div class="registration-form-footer">
        <span class="registration-form-footer__label">
          Уже зарегестрированы?
        </span>
        <RouterLink
          :to="'/login'"
          class="registration-form-footer__link"
        >
          Войти
        </RouterLink>
      </div>
    </v-sheet>
  </AuthLayout>
</template>

<script setup lang="ts">
  import { ref, unref } from 'vue'
  import AuthLayout from '@/layouts/Auth/AuthLayout.vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'

  const newUser = ref<Record<any, unknown>>({
    login: '',
    user_name: '',
    user_surname: '',
    user_group: '',
    password: ''
  })
  const rules = ref({
    required: (value: string) => !!value || 'Required.',
    min: (v: string) => v.length >= 8 || 'Min 8 characters'
  })
  const router = useRouter()

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user', unref(newUser))
      if (response.status >= 200 && response.status < 300) {
        alert('Вы успешно зарегестрировались!')
        router.push('/login')
      }
    } catch (e: any) {
      if (e.response.status === 452) alert('Пользователь с таким логином уже существует!')
      console.error(e)
    }
  }
</script>

<style scoped lang="scss">
  @import '@/views/styles/registration-view.scss';
</style>