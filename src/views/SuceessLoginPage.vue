<template>
  <v-container fluid>
    <v-card class="mx-auto" elevation="16" max-width="680">
      <v-card-item class="text-h4">
        {{ t('success_third_party_login.title') }}
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getRefreshRequest } from '@/requests/auth.js';
import { onMounted } from 'vue'

const { t, locale } = useI18n({ scope: 'global', })
const router = useRouter()

onMounted(() => {
  getRefreshRequest()
  router.replace("/")
})

</script>