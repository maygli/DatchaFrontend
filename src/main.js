/*eslint-disable*/
import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'
import "@mdi/font/css/materialdesignicons.css";
import { messages, getDefaultLocale } from './i18n'
import { createI18n, useI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { useDragNDropDialog } from '@/utils/dragndrop.js'
import timeago from 'vue-timeago3'

console.log("messages=", messages)

const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  locale: getDefaultLocale(),
  globalInjection: true,
  messages: messages,
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    iconfont: 'mdi',
  },
})

const pinia = createPinia()

useDragNDropDialog()

//Use router should call last. All libraries should be ready before router is called
createApp(App, {
  setup() {
    const { t } = useI18n()
    return { t }
  }
}).use(vuetify).use(pinia).use(i18n).use(router).use(timeago).mount('#app')
