<template>
  <v-dialog width="auto" persistent content-class=".vss-movable">
    <template #default>
      <v-card>
        <v-card-title class=".vss-movable">{{ t("edit_project_properties.title") }}</v-card-title>
        <v-form @submit.prevent="onSendData">
          <v-tabs center-active v-model="tab">
            <v-tab class="text-none" value="1">General</v-tab>
            <v-tab class="text-none" value="2">Devices</v-tab>
          </v-tabs>
          <v-card-item>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="1">
                <GeneralSettingsPage
                  ref = "generalSettings"
                  :name = "props.name"
                  :img-url="props.imgUrl"
                  :name-placeholder="t('new_project.enter_project_name')"
                  :name-label="t('new_project.project_name')"
                  name-icon="mdi-apps"
                  :image-loadhelp="t('new_project.select_project_image')"
                  :validation-message="t('validation.project_name_len')"
                >
                </GeneralSettingsPage>
              </v-tabs-window-item>
              <v-tabs-window-item value="2">
              </v-tabs-window-item>
            </v-tabs-window>
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
import {putProject} from '@/requests/projects_requests.js'
const { t } = useI18n({ scope: 'global', })

const ERROR_NOT_FOUND = 404

const generalSettings = ref()

const emit = defineEmits(['close'])

const tab = ref(null)
const alert = ref(false)
const errorMsg = ref("")

const props = defineProps({
  id: Number,
  name: String,
  imgUrl: String,
})

function onSendData(event) {
  console.log("onSendData event=", event)
  event.preventDefault();
  const data = new FormData();
  data.append("project_name", generalSettings.value.getName())
  data.append("project_image", generalSettings.value.getImage())
  data.append("project_id", props.id)
  console.log([...data.entries()]);
  putProject(data).then(function () {
    console.log('Successfully update project');
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
}
</script>
