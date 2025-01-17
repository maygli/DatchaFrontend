<template>
  <v-dialog width="auto" persistent content-class=".vss-movable">
    <template #default>
      <v-card>
        <v-card-title class=".vss-movable">{{ t("new_project.title") }}</v-card-title>
        <v-form @submit.prevent="onSendData" ref="form">
          <v-card-item>
            <GeneralSettingsPage
              ref = "generalSettings"
              :name-placeholder="t('new_project.enter_project_name')"
              :name-label="t('new_project.project_name')"
              name-icon="mdi-apps"
              :image-loadhelp="t('new_project.select_project_image')"
              :validation-message="t('validation.project_name_len')"
            >
            </GeneralSettingsPage>
          </v-card-item>
          <v-card-item>
            <v-alert closable :close-text="t('allert.close')" color="error" v-model="alert">{{
          t(errorMsg) }}</v-alert>
          </v-card-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit">{{ t("dialog.ok") }}</v-btn>
            <v-btn @click="emit('close')">{{ t("dialog.cancel") }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import GeneralSettingsPage from '@/pages/GeneralSettingsPage.vue';
import {postNewProject} from '@/requests/projects_requests.js'
const { t } = useI18n({ scope: 'global', })

const ERROR_NOT_FOUND = 404

const generalSettings = ref()

const emit = defineEmits(['close'])

const alert = ref(false)
const errorMsg = ref("")
const form = ref(null)

function onSendData(event) {
  event.preventDefault();
  form.value.validate().then(({valid: isValid})=>{
    if(!isValid) {
      return
    } 
    const data = new FormData();
    data.append("project_name", generalSettings.value.getName())
    data.append("project_image", generalSettings.value.getImage())
    console.log([...data.entries()]);
    postNewProject(data).then(function () {
      emit('close')
    }).catch(function (error) {
      console.log("error=", error);
      let msg = "server.errors.internal"
      if (error.response && error.response.status != ERROR_NOT_FOUND) {
        msg = error.response.data
      }
      msg = msg.trim()
      console.log("msg='" + msg + "'")
      errorMsg.value = msg
      alert.value = true;
      setTimeout(() => {
        console.log("Timeout called")
        if (alert.value) {
          console.log("alert true");
          alert.value = false
        }
      }, 2000)
    });
  }).catch(()=>{
    console.log("Validation error")
  })
}
</script>
