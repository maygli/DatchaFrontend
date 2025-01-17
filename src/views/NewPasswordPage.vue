<template>
  <v-container fluid>
    <v-card class="mx-auto" elevation="16" max-width="380">
      <v-toolbar color="primary">
        <v-toolbar-title>{{ t("new_password.title") }}</v-toolbar-title>
      </v-toolbar>
      <v-form v-model="form" @submit.prevent="onSubmit" class="mx-auto px-6 py-8">
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
        <v-card-item d-flex class="justify-end">
          <span>
            <v-btn :loading="loading" color="primary" size="large" variant="elevated" type="submit">
              {{ t("dialog.ok") }}
            </v-btn>
            &nbsp;
            <v-btn :loading="loading" color="primary" size="large" variant="elevated">
              {{ t("dialog.cancel") }}
            </v-btn>
          </span>
        </v-card-item>
        <v-alert closable :close-text="t('allert.close')" color="error" v-model="alert">{{
          t(errorMsg) }}</v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
const { t } = useI18n({ scope: 'global', })

const PASSWORD_MIN_LEN = 4

const form = ref(false)
const password = ref(null)
const repeatPassword = ref(null)
const loading = ref(false)
const show1 = ref(false)
const alert = ref(false)
const repeatePasswordInp = ref(null)
const errorMsg = ref("")

function onSubmit() {
  if (!form.value) return
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