<template>
  <v-container fluid>
    <v-card class="mx-auto" elevation="16" max-width="380">
      <v-toolbar color="primary">
        <v-toolbar-title>{{ t("authentification.register") }}</v-toolbar-title>
      </v-toolbar>
      <v-form v-model="form" @submit.prevent="onSubmit" class="mx-auto px-6 py-8">
        <v-text-field v-model="username" :readonly="loading" :rules="[validateUserName]" class="mb-2"
          :label="t('register_page.name')" clearable prepend-inner-icon="mdi-account"
          :placeholder="t('register_page.enter_login')"></v-text-field>

        <v-text-field v-model="email" :readonly="loading" :rules="[validateEmail]" class="mb-2"
          :label="t('register_page.email')" clearable prepend-inner-icon="mdi-email"
          :placeholder="t('register_page.enter_email')"></v-text-field>

        <v-text-field v-model="password" :readonly="loading" :rules="[validatePassword]"
          :label="t('authentification.passowrd')" :placeholder="t('authentification.enter_password')" clearable
          prepend-inner-icon="mdi-lock" :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="show1 = !show1" :type="show1 ? 'text' : 'password'"></v-text-field>

        <v-text-field v-model="repeatPassword" ref="repeatePasswordInp" :readonly="loading"
          :rules="[validatePasswordRepeate]" :label="t('register_page.repeat_password')"
          :placeholder="t('register_page.repeat_password')" clearable prepend-inner-icon="mdi-lock"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="show1 = !show1"
          :type="show1 ? 'text' : 'password'"></v-text-field>

        <br>
        <v-btn :loading="loading" color="primary" size="large" type="submit" variant="elevated" block>
          {{ t("authentification.register") }}
        </v-btn>
        <v-alert closable :close-text="t('allert.close')" color="error" v-model="alert">{{
          t(errorMsg) }}</v-alert>
        <div class="text-grey-8 py-4">{{ t("register_page.already_have_account") }}<router-link to="login_page"><a
              href="#login_page">{{
          t("authentification.signin") }}</a></router-link>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
/*eslint-disable*/
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/authstore.js'
import { useRouter } from 'vue-router'
import { isEmailValid } from '@/utils/validate.js'
import { Notifier } from '@/notifier/notifier'

const USER_NAME_MIN_LEN = 3
const PASSWORD_MIN_LEN = 4

const { t, locale } = useI18n({ scope: 'global', })

const form = ref(false)
const username = ref(null)
const email = ref(null)
const password = ref(null)
const repeatPassword = ref(null)
const loading = ref(false)
const show1 = ref(false)
const alert = ref(false)
const repeatePasswordInp = ref(null)
const errorMsg = ref("")

const router = useRouter()
const authStore = useAuthStore();

onBeforeMount(() => {
  let notifier = Notifier.getInstance()
  notifier.enable(false)
})

function onSubmit() {
  if (!form.value) return

  loading.value = true
  alert.value = false
  let data = {
    username: username.value,
    email: email.value,
    password: password.value,
    locale: locale.value
  }
  axios.post('/register', data)
    .then(function (response) {
      loading.value = false;
      alert.value = false;
      console.log(response.data);
      authStore.setAuthStatus(response.data.auth_status)
      let notifier = Notifier.getInstance()
      notifier.enable(true)
      router.push("/confirm_page")
    })
    .catch(function (error) {
      console.log("error=", error);
      let msg = "server.errors.internal"
      if (error.response) {
        msg = error.response.data
      }
      msg = msg.trim()
      console.log("msg='" + msg + "'")
      errorMsg.value = msg
      loading.value = false;
      alert.value = true;
      setTimeout(() => {
        console.log("Timeout called")
        if (alert.value) {
          console.log("alert true");
          loading.value = false,
            alert.value = false
        }
      }, 2000)
    });
}

function required(v) {
  return !!v || t("validation.required")
}

function validateUserName(v) {
  if (!v) {
    return t("validation.required")
  }
  if (v.length < USER_NAME_MIN_LEN) {
    return t("validation.user_name_len")
  }
  return true
}

function validateEmail(v) {
  if (isEmailValid(v)) {
    return true;
  }
  return t("validation.invalid_email")
}

function validatePassword(v) {
  if (!v) {
    return t("validation.required")
  }
  if (v.length < PASSWORD_MIN_LEN) {
    return t("validation.pwd_len")
  }
  let repPwdInp = repeatePasswordInp.value;
  repPwdInp.validate();
}

function validatePasswordRepeate(v) {
  if (v == password.value) {
    return true
  }
  return t("validation.passdontmatch")
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>