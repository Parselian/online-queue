import { defineStore } from "pinia"

export const useLoginStore = defineStore('login', {
  state: () => ({
    login: '',
    password: '',
    isLoggedIn: false,
    rules: {
      required: (value: string) => !!value || 'Заполните поле',
      min: (v: string) => v.length >= 8 || 'Мин. 8 символов'
    }
  }),
  getters: {
    isFormFilled: (state) => !state.login || !state.password ? false : true,
  }
})