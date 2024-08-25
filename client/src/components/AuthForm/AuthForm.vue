<template>
  <v-form
    @submit.prevent="validate"
    ref="form"
    class="auth-form"
  >
    <div class="auth-form__fields">

      <template v-if="store.isActiveRegisterRoute">
        <v-text-field
          v-model="store.userFormData.user_name"
          density="compact"
          :rules="[rules.onlyText]"
          label="Имя"
          variant="underlined"
          class="auth-form__field"
        />
        <v-text-field
          v-model="store.userFormData.user_surname"
          density="compact"
          :rules="[rules.onlyText]"
          label="Фамилия"
          variant="underlined"
          class="auth-form__field"
        />
        <v-text-field
          v-model="store.userFormData.user_group"
          :rules="[rules.group]"
          density="compact"
          label="Группа"
          variant="underlined"
          class="auth-form__field"
        />
        <v-text-field
          v-model="store.userFormData.login"
          :rules="[rules.login]"
          density="compact"
          type="text"
          clearable
          label="Логин"
          variant="underlined"
          class="auth-form__field"
        />
        <v-text-field
          v-model="store.userFormData.password"
          :rules="[rules.password]"
          density="compact"
          clearable
          type="password"
          label="Пароль"
          variant="underlined"
          class="auth-form__field"
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
          variant="underlined"
          class="auth-form__field"
        />
        <v-text-field
          v-model="store.userFormData.password"
          :rules="[rules.password]"
          density="compact"
          clearable
          type="password"
          label="Пароль"
          variant="underlined"
          class="auth-form__field"
        />
        <RouterLink
          :to="'/reset-password'"
          class="auth-form__forgot"
        >
          Забыли пароль?
        </RouterLink>
      </template>
    </div>


    <div class="auth-form__controls">
      <v-btn
        type="submit"
        block
        color="#17A0FF"
        flat
        class="auth-form__submit"
      >
        {{ submitText }}
      </v-btn>
      <div
      v-if="store.isActiveLoginRoute"
        class="auth-form-controls__label"
      >
        Нет аккаунта?
      </div>
      <v-btn
        v-if="store.isActiveLoginRoute"
        block
        flat
        variant="outlined"
        color="#17A0FF"
        @click="router.push('/register')"
      >
        Зарегестрироваться
      </v-btn>
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
  import router from '@/router'

  const rules = ref({
    required: (v: string) => !!v.trim() || 'Только буквы рус./лат. алфавита',
    login: (v: string) => loginValidation.test(v) || '6-20 символов/цифр',
    password: (v: string) => passwordValidation.test(v) || '8-16 символов/цифр',
    group: (v: string) => (!isNaN(+v) && v !== null && +v.toString().trim().length === 4) || '4 цифры',
    onlyText: (v: string) => (!!v.trim() && onlyTextValidation.test(v)) || 'рус./лат. алфавит'
  })

  const store = useAuthStore()
  const form = ref()

  const submitText = computed(() => store.isActiveLoginRoute ? 'Войти' : 'Зарегистрироваться')

  const validate = async () => {
    const {valid} = await form.value.validate()

    if (valid && store.isActiveLoginRoute) login(form)
    if (valid && store.isActiveRegisterRoute) register(form)
  }
</script>

<style scoped lang="scss">
  @import '@/components/AuthForm/scss/authForm/auth-form.scss';
</style>