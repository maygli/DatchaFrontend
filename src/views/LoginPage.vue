<template>
  <v-container fluid>
    <v-card class="mx-auto" elevation="16" max-width="380">
      <v-toolbar color="primary">
        <v-toolbar-title>{{ t("authentification.signin") }}</v-toolbar-title>
      </v-toolbar>
      <v-form v-model="form" @submit.prevent="onSubmit" class="mx-auto px-6 py-8">
        <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2"
          :label="t('login_page.email_or_login')" clearable prepend-inner-icon="mdi-account"
          :placeholder="t('login_page.enter_login_or_email')"></v-text-field>

        <v-text-field v-model="password" :readonly="loading" :rules="[required]" :label="t('authentification.passowrd')"
          :placeholder="t('authentification.enter_password')" clearable prepend-inner-icon="mdi-lock"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="show1 = !show1"
          :type="show1 ? 'text' : 'password'"></v-text-field>

        <div class="text-grey-8 text-left"><router-link to="reset_password_page"><a href="reset_password_page">{{
          t("login_page.fogot_password") }}</a></router-link>
        </div>
        <br>
        <v-btn :loading="loading" color="primary" size="large" type="submit" variant="elevated" block>
          {{ t("authentification.signin") }}
        </v-btn>
        <v-alert closable :close-text="t('allert.close')" color="error" v-model="alert">{{
          t("alert.invalid_login_password") }}</v-alert>
        <div class="text-grey-8 py-4">{{ t("login_page.dont_have_account") }}<router-link to="register_page"><a
              href="#register_page">{{ t("authentification.register") }}</a></router-link>
        </div>
      </v-form>
      <v-card-actions class="justify-center">
         <v-btn :icon="GoogleImg" @click="onGoogleClicked()"></v-btn>         
         <v-btn :icon="theme.global.name.value==='dark'?AppleImgWhite:AppleImgBlack" @click="onAppleClicked()"></v-btn>         
         <v-btn :icon="TelegramImg" @click="onTelegramClicked()"></v-btn>         
         <v-btn :icon="YandexImg" @click="onYandexClicked()"></v-btn>         
         <v-btn :icon="VkImg" @click="onVkClicked()"></v-btn>         
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
/*eslint-disable*/
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authstore.js'
import { useTheme } from 'vuetify'
import GoogleImg from '@/assets/google-icon-logo-svgrepo-com.svg'
import AppleImgBlack from '@/assets/Apple_logo_black.svg'
import AppleImgWhite from '@/assets/Apple_logo_white.svg'
import TelegramImg from '@/assets/Telegram_2019_Logo.svg'
import YandexImg from '@/assets/Yandex_znak.svg'
import VkImg from '@/assets/VK_Logo.svg'
import { authRequest } from '@/requests/auth.js'

const GOOGLE_PROVIDER="google"
const VK_PROVIDER = "vk"
const TELEGRAM_PROVIDER = "telegram"
const YANDEX_PROVIDER = "yandex"

const router = useRouter()
const authStore = useAuthStore()

const { t } = useI18n({ scope: 'global', })
const theme = useTheme()

const form = ref(false)
const email = ref(null)
const password = ref(null)
const loading = ref(false)
const show1 = ref(false)
const alert = ref(false)
const AppleImage = ref(AppleImgWhite)


function onSubmit() {
  if (!form.value) return

  loading.value = true
  alert.value = false
  let data = { username: email.value, password: password.value }
  axios.put('/login', data)
    .then(function (response) {
      loading.value = false;
      alert.value = false;
      console.log(response);
      let status = undefined
      if (response && response.data) {
        status = response.data.auth_status
      }
      authStore.setAuthStatus(status)
      if (response.headers.authorization) {
        console.log("Set local storage")
        localStorage.setItem("refresh", response.headers.authorization)
      }
      router.push("/projects_page")
    })
    .catch(function (error) {
      loading.value = false;
      alert.value = true;
      setTimeout(() => {
        console.log("Timeout called")
        if (alert.value) {
          loading.value = false,
            alert.value = false
        }
      }, 2000)
    });

}

function required(v) {
  return !!v || t("validation.required")
}

function onGoogleClicked() {
   authRequest(GOOGLE_PROVIDER)	
}

function onVkClicked() {
   authRequest(VK_PROVIDER)	
}

function onTelegramClicked() {
   authRequest(TELEGRAM_PROVIDER)	
}

function onYandexClicked() {
   authRequest(YANDEX_PROVIDER)	
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
