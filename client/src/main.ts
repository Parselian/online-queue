import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { vuetify } from './plugins/vuetify'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({store}) => {
  store.$router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
