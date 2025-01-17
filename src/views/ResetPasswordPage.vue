<template>
  <v-container fluid>
    <v-card class="mx-auto" elevation="16" max-width="380">
      <v-toolbar color="primary">
        <v-toolbar-title>{{ t("reset_password.title") }}</v-toolbar-title>
      </v-toolbar>
      <v-card-item>
        <div v-if="disabled">
          {{ t('reset_password.has_send') }}
        </div>
        <div v-else>
          {{ t('reset_password.will_send') }}
        </div>
      </v-card-item>
      <v-form @submit.prevent="onSubmit" class="mx-auto px-6 py-8" v-model="form">
        <v-text-field v-model="email" :readonly="loading" :rules="[validateEmail]" class="mb-2"
          :label="t('reset_password.email')" clearable prepend-inner-icon="mdi-email"
          :placeholder="t('reset_password.enter_email')"></v-text-field>
        <br>
        <v-card-item>
          <TimerWidget interval="60" :message="t('reset_password.resend')" ref="timer" @timeout="onTimeout"
            v-if="disabled">
          </TimerWidget>
        </v-card-item>
        <v-btn :loading="loading" :disabled="disabled" color="primary" size="large" type="submit" variant="elevated"
          block>
          {{ t("reset_password.send") }}
        </v-btn>
      </v-form>
      <v-alert closable :close-text="t('allert.close')" color="error" v-model="alert">{{
          t(errorMsg) }}</v-alert>
      <v-card-item>
        <div class="text-grey-8 py-4">{{ t("reset_password.remembered") }}&nbsp;<router-link to="login_page"><a
              href="#login_page">{{
          t("authentification.signin") }}</a></router-link>
        </div>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { isEmailValid } from '@/utils/validate.js'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TimerWidget from '@/components/TimerWidget.vue'
const { t, locale } = useI18n({ scope: 'global', })

console.log("Locale=", locale.value)
const form = ref(null)
const loading = ref(false)
const disabled = ref(false)
const alert = ref(false)
const email = ref(null)
const timer = ref()

function validateEmail(v) {
  if (isEmailValid(v)) {
    return true;
  }
  return t("validation.invalid_email")
}

function onSubmit() {
  if (!form.value) return
  disabled.value = true
}

function onTimeout() {
  disabled.value = false
}

</script>