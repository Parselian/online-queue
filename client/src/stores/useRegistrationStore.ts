import { defineStore } from "pinia"

export const useRegistrationStore = defineStore('register', {
  state: () => ({
    newUserData: {
      login: '',
      password: '',
      user_name: '',
      user_surname: '',
      user_group: '',
      user_type: 1,
    },
    rules: {
      required: (value: string) => !!value || 'Заполните поле',
      min: (v: string) => v.length >= 8 || 'Мин. 8 символов'
    }
  }),
  getters: {
    isFormFilled: (state) => Object.values(state.newUserData).includes(''),
    isPasswordPassed: (state) => state.newUserData.password.length >= 8,
  }
})