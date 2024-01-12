<template>
  <AuthLayout>
    <v-sheet
      :elevation="5"
      class="registration-form"
    >
      <h2 class="registration-form__title">Регистрация</h2>
      <v-form
        @submit.prevent="createUser"
        v-model="isFormFilled"
      >
        <v-text-field
          v-model="newUser.login"
          density="compact"
          :rules="[rules.required]"
          clearable
          label="Логин"
        />
        <v-text-field
          v-model="newUser.user_name"
          density="compact"
          :rules="[rules.required]"
          clearable
          label="Имя"
        />
        <v-text-field
          v-model="newUser.user_surname"
          density="compact"
          :rules="[rules.required]"
          clearable
          label="Фамилия"
        />
        <v-text-field
          v-if="!isAdminRegister"
          v-model="newUser.user_group"
          :rules="[rules.required]"
          density="compact"
          clearable
          label="Группа"
        />
        <v-text-field
          v-model="newUser.password"
          density="compact"
          type="password"
          clearable
          :rules="[rules.min, rules.required]"
          label="Пароль"
        />
        <v-btn
          :disabled="!isFormFilled"
          type="submit"
          block
          :color="'black'"
          clearable
          class="mt-2"
        >
          Зарегистрироваться
        </v-btn>
      </v-form>
      <div class="registration-form-footer">
        <span class="registration-form-footer__label">
          Уже зарегистрированы?
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
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const isAdminRegister = ref(route.name === 'admin-register')
  const isFormFilled = ref(false)
  const newUser = ref<Record<any, any>>({
    login: '',
    user_name: '',
    user_surname: '',
    user_group: '',
    password: '',
    user_type: unref(isAdminRegister) ? 2 : 1
  })
  const rules = ref({
    required: (value: string) => !!value || 'Required.',
    min: (v: string) => v.length >= 8 || 'Min 8 characters'
  })
  const router = useRouter()

  const createUser = async () => {
    try {
      if (Object.values(newUser.value).includes('') || newUser.value.password.length < 8) return false

      const response = await axios.post(`${import.meta.env.VITE_HOSTNAME}/api/user`, unref(newUser))
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
  @import '@/views/styles/registrationView/registration-view.scss';
</style>