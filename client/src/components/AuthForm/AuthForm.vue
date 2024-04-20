<template>
  <v-form
    @submit.prevent="validate"
    ref="form"
  >
    <template v-if="store.isActiveRegisterRoute">
      <v-text-field
        v-model="store.userData.user_name"
        density="compact"
        :rules="[rules.required]"
        label="Имя"
      />
      <v-text-field
        v-model="store.userData.user_surname"
        density="compact"
        :rules="[rules.required]"
        label="Фамилия"
      />
      <v-text-field
        v-model="store.userData.user_group"
        :rules="[rules.required]"
        density="compact"
        label="Группа"
      />      
    </template>

    <v-text-field
      v-model="store.userData.login"
      :rules="[rules.required]"
      density="compact"
      type="text"
      clearable
      label="Логин"
    />
    <v-text-field
      v-model="store.userData.password"
      :rules="[rules.min, rules.required]"
      density="compact"
      type="password"
      clearable
      label="Пароль"
    />
    <v-btn
      type="submit"
      block
      class="mt-2"
      :color="'black'"
    >
      {{ submitText }}
    </v-btn>
    <div class="auth-form-footer">
      <span class="auth-form-footer__label">
        {{ footerTitle }}
      </span>
      <RouterLink
        v-if="store.isActiveLoginRoute"
        :to="'/register'"
        class="auth-form-footer__link"
      >
        Зарегестрироваться
      </RouterLink>
      <RouterLink
        v-else-if="store.isActiveRegisterRoute"
        :to="'/login'"
        class="auth-form-footer__link"
      >
        Войти
      </RouterLink>
    </div>
  </v-form>
</template>

<script setup lang="ts">
  import {
    computed,
    ref
  } from 'vue'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { login, register } from './features/auth';

  const rules = ref({
    required: (value: string | number) => !!value || 'Заполните поле',
    min: (v: string) => v.length >= 8 || 'Мин. 8 символов'
  })
  
  const store = useAuthStore()
  const form = ref()

  const submitText = computed(() => store.isActiveLoginRoute ? 'Войти' : 'Зарегестрироваться')
  const footerTitle = computed(() => store.isActiveLoginRoute ? 'Нет аккаунта?' : 'Уже зарегестрированы?')

  const validate = async () => {
    const {valid} = await form.value.validate()

    if (valid && store.isActiveLoginRoute) login()
    if (valid && store.isActiveRegisterRoute) register()
  }
</script>

<style scoped lang="scss">
  @import '@/components/AuthForm/scss/authForm/auth-form.scss';
</style>