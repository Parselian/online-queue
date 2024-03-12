import { defineStore } from "pinia"

export const useLoginStore = defineStore('login', {
  state: () => ({
    login: '',
    password: '',
    isLoggedIn: false,
    rules: {
      required: (value: string) => !!value || 'Required.',
      min: (v: string) => v.length >= 8 || 'Min 8 characters'
    }
  }),
  getters: {
    isFormFilled: (state) => !state.login || !state.password ? false : true,
  }
})