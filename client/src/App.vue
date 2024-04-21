<template>
  <RouterView />
</template>

<script setup lang="ts">
  import {RouterView} from 'vue-router'
  import {checkUserLogin} from '@/helpers/checkUserLogin'

  checkUserLogin()
</script>

<style scoped>
</style>
