<template>
  <v-container fluid>
    <v-card class="mx-auto" elevation="16" max-width="380">
      <v-toolbar color="primary">
        <v-toolbar-title>{{ t("confirm_email.title") }}</v-toolbar-title>
      </v-toolbar>
      <v-card-item>
        <p>{{ t("confirm_email.message1") }}</p>
        <p>{{ t("confirm_email.message2") }}</p>
        <p>{{ t("confirm_email.message3") }}</p>
      </v-card-item>
      <v-card-item>
        <TimerWidget :interval="10" :message="t('reset_password.resend')" ref="timer" @timeout="onTimeout"
          v-if="disabled">
        </TimerWidget>
      </v-card-item>
      <v-card-item>
        <v-btn :disabled="disabled" color="primary" size="large" variant="elevated" block @click="onSubmit">
          {{ t("reset_password.send") }}
        </v-btn>
      </v-card-item>
      <v-card-item>
        <a @click="onLogout" href="javascript:void(0);">{{ t("confirm_email.logout") }}</a>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import TimerWidget from '@/components/TimerWidget.vue'
import { logout } from "@/requests/auth.js"
import { useAuthStore } from '@/stores/authstore.js'
import { useRouter } from 'vue-router'
import { sendConfirmEmail } from '@/requests/auth.js'
import { getAccountStatus } from '@/requests/auth.js'
import { Notifier } from '@/notifier/notifier'

const { t } = useI18n({ scope: 'global', })
const router = useRouter()
const authStore = useAuthStore();

const timer = ref()
const disabled = ref(true)

onBeforeMount(() => {
  let notifier = Notifier.getInstance()
  notifier.enable(true)
  notifier.addVisibleChangeCallback(onVisibile)
})

function onVisibile() {
  getAccountStatus().then(response => {
    console.log("getAccountStatus response = ", response)
    if (response.data.auth_status != "need_confirm") {
      authStore.setAuthStatus(response.data.auth_status)
      router.push("/")
    }
  }).catch(error => {
    console.log("getAccountStatus error = ", error)
  })
  console.log("onVisible called")
}

function onTimeout() {
  disabled.value = false
}

function onSubmit() {
  disabled.value = true
  sendConfirmEmail("ru").then(response => {
    console.log("response=", response)
  }).catch(error => {
    console.log("error=", error)
  })
}

function onLogout() {
  logout();
  authStore.setAuthStatus(undefined)
  router.push({ name: "login_page" })
}
</script>