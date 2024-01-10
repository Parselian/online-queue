<template>
  <DefaultLayout>
    <h1 class="session__title">{{ pageTitle }}</h1>
    <div class="session-controls">
      <v-select
        v-model="selectedSessionId"
        :items="sessionsList"
        item-title="session_name"
        item-value="id"
        class="session-controls__select"
        density="compact"
        variant="underlined"
        label="Желаемая сессия"
      >
      </v-select>
      <v-btn
        @click="selectSession"
        color="black"
        class="session-controls__button"
      >
        Выбрать сессию
      </v-btn>
      <span
        v-if="isAlertVisible"
        class="session-controls__alert"
      >
        Пожалуйста выберите сессию
      </span>
    </div>

    <template
      #controls
      v-if="isAdminRoute"
    >
      <div class="session-create">
        <v-text-field
          v-model="newSessionData.session_name"
          density="compact"
          variant="underlined"
          label="Название сессии"
        >
        </v-text-field>
        <v-btn
          @click="createSession"
          color="black"
          class="session-create__button"
        >
          Создать сессию
        </v-btn>
        <span
          v-if="isCreateSessionAlertVisible"
          class="session-controls__alert"
        >
          Пожалуйста введите название новой сессии
        </span>
      </div>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import DefaultLayout from '@/layouts/Default/DefaultLayout.vue'
  import { computed, ref, unref } from 'vue'
  import axios from 'axios'
  import router from '@/router'
  import { useRoute } from 'vue-router'
  import { checkUserLogin } from '@/helpers/checkUserLogin'

  const route = useRoute()

  if (!checkUserLogin()) router.push('/register')
  if (route.name === 'admin-session' && localStorage.user_type != 2) router.push('/login')

  const isAdminRoute = computed(() => route.name === 'admin-session')
  const pageTitle = computed(() => unref(isAdminRoute) ? 'У вас нет активной сессии' : 'Вам необходимо подключиться к сессии')

  const sessionsList = ref([])
  const selectedSessionId = ref()
  const isAlertVisible = ref<boolean>(false)
  const isCreateSessionAlertVisible = ref<boolean>(false)
  const newSessionData = ref({
    session_name: '',
    creator_id: localStorage.user_id
  })

  const getSessionsList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/sessions')

      sessionsList.value = await response.data
    } catch (e) {
      console.error(e)
    }
  }
  getSessionsList()

  const selectSession = () => {
    if (!unref(selectedSessionId)) return isAlertVisible.value = true
    isAlertVisible.value = false
    localStorage.selected_session_id = unref(selectedSessionId)
    if (unref(isAdminRoute)) return router.push('/admin/queue')
    router.push('/queue')
  }

  const createSession = async () => {
    try {
      if (!unref(newSessionData).session_name) isCreateSessionAlertVisible.value = true
      else {
        await axios.post('http://localhost:8080/api/create-session', unref(newSessionData))
        isCreateSessionAlertVisible.value = false
        newSessionData.value.session_name = ''
        getSessionsList()
      }
    } catch (e) {
      console.error(e)
    }
  }
</script>

<style scoped lang="scss">
  @import "@/views/styles/sessionView/session-view.scss";
</style>