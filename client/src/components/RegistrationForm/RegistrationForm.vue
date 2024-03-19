<template>
  <v-form
    @submit.prevent="createUser"
  >
    <v-text-field
      v-model="store.newUserData.login"
      density="compact"
      :rules="[store.rules.required]"
      label="Логин"
    />
    <v-text-field
      v-model="store.newUserData.user_name"
      density="compact"
      :rules="[store.rules.required]"
      label="Имя"
    />
    <v-text-field
      v-model="store.newUserData.user_surname"
      density="compact"
      :rules="[store.rules.required]"
      label="Фамилия"
    />
    <v-text-field
      v-if="!isAdminRegister"
      v-model="store.newUserData.user_group"
      :rules="[store.rules.required]"
      density="compact"
      label="Группа"
    />
    <v-text-field
      v-model="store.newUserData.password"
      density="compact"
      type="password"
      :rules="[store.rules.min, store.rules.required]"
      label="Пароль"
    />
    <v-btn
      :disabled="store.isFormFilled || !store.isPasswordPassed"
      type="submit"
      block
      :color="'black'"
      class="mt-2"
    >
      Зарегистрироваться
    </v-btn>
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
  </v-form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import { createUser } from './helpers/register'
  import { useRegistrationStore } from '@/stores/useRegistrationStore'

  const route = useRoute()
  const isAdminRegister = ref(route.name === 'admin-register')

  const store = useRegistrationStore()
</script>

<style scoped lang="scss">
  @import '@/views/styles/registrationView/registration-view.scss';
</style>