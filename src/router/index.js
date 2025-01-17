import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import { useAuthStore } from '@/stores/authstore.js'
import { VSpacer } from 'vuetify/lib/components/index.mjs'
import ProjectsToolbar from '@/components/ProjectsToolbar.vue'
import ConfirmEmailPage from '@/views/ConfirmEmailPage.vue'
import ResetPasswordPage from '@/views/ResetPasswordPage.vue'
import SplashScreen from '@/views/SplashScreen.vue'
import SuceessLoginPage from '../views/SuceessLoginPage.vue'
import ParameterWidget from '@/components/ParameterWidget.vue'
import ComponentContainer from '@/components/ComponentContainer.vue'

const routes = [
  {
    path: '/',
    name: 'splash',
    components: {
      default: SplashScreen,
      //      default: ComponentContainer,
      toolbar: VSpacer,
    },
    meta: { accStatuses: ["undefined", "need_confirm", "confirmed"] }
  },
  {
    path: '/third_party',
    name: 'third_party',
    components: {
      default: SuceessLoginPage,
      toolbar: VSpacer,
    },
    meta: { accStatuses: ["undefined", "need_confirm", "confirmed"] }
  },
  {
    path: '/login_page',
    name: 'login_page',
    components: {
      default: LoginPage,
      toolbar: VSpacer,
    },
    meta: { accStatuses: ["unauthorized", "need_confirm"] }
  },
  {
    path: '/register_page',
    name: 'register_page',
    components: {
      default: RegisterPage,
      toolbar: VSpacer,
    },
    meta: { accStatuses: ["unauthorized", "need_confirm"] }
  },
  {
    path: '/projects_page',
    name: 'projects_page',
    components: {
      default: ProjectsView,
      toolbar: ProjectsToolbar,
    },
    meta: { accStatuses: ["confirmed"] }
  },
  {
    path: '/confirm_page',
    name: 'confirm_page',
    components: {
      default: ConfirmEmailPage,
      toolbar: VSpacer,
    },
    meta: { accStatuses: ["need_confirm"] }
  },
  {
    path: '/reset_password_page',
    name: 'reset_password_page',
    components: {
      default: ResetPasswordPage,
      toolbar: VSpacer,
    },
    meta: { accStatuses: ["password_reseted"] }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  let accStatus = authStore.accStatus
  if (accStatus == null) {
    accStatus = "undefined"
  }
  let routerName = "splash"
  if (!to.meta.accStatuses.includes(accStatus)) {
    switch (accStatus) {
      case "need_confirm":
        routerName = "confirm_page"
        break
      case "unauthorized":
        routerName = "login_page"
        break
    }
    next({ name: routerName })
  } else {
    next()
  }
})

export default router
