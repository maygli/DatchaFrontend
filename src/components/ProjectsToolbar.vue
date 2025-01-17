<template>
  <TooltipButton @click="isShowAddProjectDlg = true" icon="mdi-home-plus" :text="t('projects_view.add_project')"
    :tooltip="t('projects_view.add_project')" tooltipLocation="bottom" :showText="props.showText">
  </TooltipButton>
  <NewProjectDlg v-model="isShowAddProjectDlg" @close="isShowAddProjectDlg = false"></NewProjectDlg>
  <AccountDialog v-model="isShowAccountDlg" @close="isShowAccountDlg = false" :name="profile.user_name" :img-url="profile.avatar"></AccountDialog>
  <MenuTooltipButton :menuItems="items" @click="onMenuItem" :tooltip="t('projects_toolbar.account_tooltip')"
    tooltipLocation="bottom">
    <template v-slot:content>
      <AccountWidget :name="profile.user_name" :avatar="profile.avatar"></AccountWidget>
    </template>
  </MenuTooltipButton>
</template>

<script setup>

const PROFILE_ITEM = "profile"
const LOGOUT_ITEM = "logout"

import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authstore.js'
import { useRouter } from 'vue-router'
import { Notifier } from '@/notifier/notifier'

import AccountWidget from '@/components/AccountWidget.vue'
import AccountDialog from '@/pages/AccountDialog.vue'
import NewProjectDlg from '@/pages/NewProjectDlg.vue'
import TooltipButton from '@/components/TooltipButton.vue';
import MenuTooltipButton from './MenuTooltipButton.vue';

import { logout } from "@/requests/auth.js"
import { getProfile } from '@/requests/profile_requests.js'


const { t } = useI18n({ scope: 'global', })
const router = useRouter()
const authStore = useAuthStore();

const isShowAddProjectDlg = ref(false)
const isShowAccountDlg = ref(false)
const items = ref([{ title: "projects_toolbar.profile", value: PROFILE_ITEM, icon: "mdi-account" },
{ title: "projects_toolbar.logout", value: LOGOUT_ITEM, icon: "mdi-logout" }])
const profile = ref(null)

const props = defineProps({
  showText: {
    type: Boolean,
    default: true
  },
})

onBeforeMount(()=>{
  let notifier = Notifier.getInstance()
  notifier.enable(true)
  notifier.addVisibleChangeCallback(loadProfileData)
  loadProfileData()
})

function loadProfileData() {
  getProfile().then(response => {
    console.log("getProfile response = ", response)
    profile.value = response.data
  }).catch(error => {
    console.log("getProfile error = ", error)
  })
  console.log("onVisible called")
}

function onLogout() {
  logout()
  authStore.setAuthStatus(undefined)
  router.push("/")
}

function onMenuItem(item) {
  console.log("Item clicked=" + item)
  if (item == PROFILE_ITEM) {
    isShowAccountDlg.value = true
  } else if (item == LOGOUT_ITEM) {
    onLogout()
  }
}
</script>