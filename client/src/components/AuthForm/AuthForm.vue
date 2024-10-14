<template>
  <v-form
    @submit.prevent="validate"
    ref="form"
  >
    <h2 class="auth-form__title">{{ title }}</h2>
    <template v-if="store.isActiveRegisterRoute">
      <v-text-field
        v-model="store.userFormData.user_name"
        density="compact"
        :rules="[rules.onlyText]"
        label="Имя"
      />
      <v-text-field
        v-model="store.userFormData.user_surname"
        density="compact"
        :rules="[rules.onlyText]"
        label="Фамилия"
      />
      <v-text-field
        v-model="store.userFormData.user_group"
        :rules="[rules.group]"
        density="compact"
        label="Группа"
      />
      <v-text-field
        v-model="store.userFormData.login"
        :rules="[rules.login]"
        density="compact"
        type="text"
        clearable
        label="Логин"
      />
      <v-text-field
        v-model="store.userFormData.password"
        :rules="[rules.password]"
        density="compact"
        clearable
        type="password"
        label="Пароль"
      />
    </template>

    <template v-else-if="store.isActiveLoginRoute">
      <v-text-field
        v-model="store.userFormData.login"
        :rules="[rules.login]"
        density="compact"
        type="text"
        clearable
        label="Логин"
      />
      <v-text-field
        v-model="store.userFormData.password"
        :rules="[rules.password]"
        density="compact"
        clearable
        type="password"
        label="Пароль"
      />
      <RouterLink
        :to="'/reset-password'"
        class="auth-form__forgot-pass"
      >
        Забыли пароль?
      </RouterLink>
    </template>



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
        Зарегистрироваться
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
  import { login, register } from './features/auth'
  import {
    loginValidation,
    passwordValidation,
    onlyTextValidation,
  } from '@/constants/regexRules'

  const rules = ref({
    required: (v: string) => !!v.trim() || 'Только буквы рус./лат. алфавита',
    login: (v: string) => loginValidation.test(v) || 'Размер логина: 6 - 20 лат. символов/цифр',
    password: (v: string) => passwordValidation.test(v) || '8-16 лат. символов + цифр',
    group: (v: string) => (!isNaN(+v) && v !== null && +v.toString().trim().length === 4) || 'Номер группы - 4 цифры без пробелов',
    onlyText: (v: string) => (!!v.trim() && onlyTextValidation.test(v)) || 'Только буквы рус./лат. алфавита'
  })

  const store = useAuthStore()
  const form = ref()

  const title = computed(() => store.isActiveLoginRoute ? 'Авторизация' : 'Регистрация')
  const submitText = computed(() => store.isActiveLoginRoute ? 'Войти' : 'Зарегистрироваться')
  const footerTitle = computed(() => store.isActiveLoginRoute ? 'Нет аккаунта?' : 'Уже зарегистрированы?')

  const validate = async () => {
    const {valid} = await form.value.validate()

    if (valid && store.isActiveLoginRoute) login(form)
    if (valid && store.isActiveRegisterRoute) register(form)
  }
</script>

<style scoped lang="scss">
  @import '@/components/AuthForm/scss/authForm/auth-form.scss';
</style>@/constants/regexRules