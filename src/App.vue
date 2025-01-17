<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar scroll-threshold="1" scroll-off-screen>
      <v-app-bar-title class="text-no-wrap">{{ t("app.title") }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-slide-group show-arrows>
        <v-spacer></v-spacer>
        <router-view name="toolbar" :showText="windowWidth > 700"></router-view>
        <v-spacer></v-spacer>
        <TooltipButton @click="toggleTheme" icon="mdi-theme-light-dark" :tooltip="t('app_bar.switch_theme')"
          tooltipLocation="bottom">
        </TooltipButton>
        <!--        <v-btn @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>-->
        <LanguageSwitcher></LanguageSwitcher>
        &nbsp;
      </v-slide-group>
    </v-app-bar>
    <v-main class="d-flex align-center justify-center">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import { useTheme } from 'vuetify'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'
import { useWindowSize } from '@vueuse/core'
import TooltipButton from '@/components/TooltipButton.vue'
import { ref, onBeforeMount } from 'vue'
import { Notifier } from '@/notifier/notifier.js'

const { t } = useI18n({ scope: 'global', })
const { width: windowWidth } = useWindowSize()

const theme = useTheme()

const isShowProjectDialog = ref(true)

function toggleTheme() {
  console.log("toggle theme called")
  console.log("theme.global.current.dark", theme.global.current.dark)
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}

onBeforeMount(() => {
  new Notifier("/notify")
})

</script>

<style></style>
