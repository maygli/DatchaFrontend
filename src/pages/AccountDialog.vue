<template>
  <v-dialog width="auto" persistent content-class=".vss-movable">
    <template #default>
      <v-card>
        <v-card-title class=".vss-movable">{{ t("edit_profile_properties.title") }}</v-card-title>
        <v-form @submit.prevent="onSendData">
          <v-tabs center-active v-model="tab">
            <v-tab class="text-none" value="1">General</v-tab>
            <v-tab class="text-none" value="2">Security</v-tab>
          </v-tabs>
          <v-card-item>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="1">
                <GeneralSettingsPage
                  ref = "generalSettings"
                  :name = "name"
                  :img-url="imgUrl"
                  :name-placeholder="t('edit_profile_properties.enter_account_name')"
                  :name-label="t('edit_profile_properties.account_name')"
                  :image-loadhelp="t('edit_profile_properties.select_user_image')"
                  :validation-message="t('validation.user_name_len')"
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
import { ref, onBeforeUpdate } from 'vue'
import { useI18n } from 'vue-i18n'
import GeneralSettingsPage from '@/pages/GeneralSettingsPage.vue';
import {putProfile} from '@/requests/profile_requests.js'
const { t } = useI18n({ scope: 'global', })

const ERROR_NOT_FOUND = 404

const generalSettings = ref()

const emit = defineEmits(['close'])

const tab = ref(null)
const alert = ref(false)
const errorMsg = ref("")

onBeforeUpdate(()=>{
  console.log("Account dialog. Before mount")
})

const props = defineProps({
  name: String,
  imgUrl: String,
})

function onSendData(event) {
  console.log("onSendData event=", event)
  event.preventDefault();
  const data = new FormData();
  data.append("user_name", generalSettings.value.getName())
  data.append("avatar", generalSettings.value.getImage())
  console.log([...data.entries()]);
  putProfile(data).then(function () {
    console.log('Profile updated successfully');
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
