<template>
  <v-sheet
    :elevation="5"
    class="registration-form"
  >
    <h2 class="registration-form__title">Регистрация</h2>
    <v-form @submit.prevent>
      <v-text-field
        v-model="login"
        label="Логин"
      />
      <v-text-field
        v-model="login"
        label="Пароль"
      />
      <v-text-field
        v-model="login"
        label="Подтверждение пароля"
      />
      <v-btn
        type="submit"
        block
        :color="'black'"
        class="mt-2"
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
  @import '@/components/RegistrationForm/styles/registration-form.scss';
</style>