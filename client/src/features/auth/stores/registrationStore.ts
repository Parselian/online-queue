import { defineStore } from "pinia"

export const useLoginStore = defineStore('registration', {
  state: () => ({
    login: '',
    password: '',
    user_name: '',
    user_surname: '',
    user_group: '',
    user_type: 1,
    rules: {
      required: (value: string) => !!value || 'Required.',
      min: (v: string) => v.length >= 8 || 'Min 8 characters'
    }
  }),
  getters: {
    isFormFilled: (state) => !state.login || !state.password ? false : true,
  }
})