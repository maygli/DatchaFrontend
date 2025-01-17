import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accStatus = ref()

  function setAuthStatus(status) {
    accStatus.value = status
  }

  return { accStatus, setAuthStatus }
})