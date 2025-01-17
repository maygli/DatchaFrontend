<template>
  <v-card>
    <v-card-title>{{ t("app.title") }}</v-card-title>
    <v-card-item>
      <v-img :src="imgUrl" width="500px"></v-img>
    </v-card-item>
    <v-card-item>
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
      {{ t("splash.loading") }}
    </v-card-item>
  </v-card>
</template>

<script setup>
import { getAccountStatus } from '@/requests/auth.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ scope: 'global', })
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authstore.js'
import { useRouter } from 'vue-router'
import imgUrl from '@/assets/datcha.jpg'

const router = useRouter()

onMounted(() => {
  const authStore = useAuthStore()
  getAccountStatus().then(response => {
    console.log("account status response=", response)
    let status = undefined
    if (response && response.data) {
      status = response.data.auth_status
    }
    authStore.setAuthStatus(status)
    router.push("/projects_page")
  }).catch(error => {
    console.log("error account status=", error)
    authStore.setAuthStatus("unauthorized")
    router.push("/login_page")
  })
})

</script>