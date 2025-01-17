<template>
    <v-chip @click="isShowHistoryDialog=!isShowHistoryDialog">{{value}}{{unit}}</v-chip>
    <ParameterHistoryDialog 
        v-model="isShowHistoryDialog"
        v-bind="props"
        @close = "isShowHistoryDialog=false"
    >
    </ParameterHistoryDialog>
<!--    <div v-bind="props">
    <div :class="isHovering ? 'd-block' : 'd-none'">
      <TooltipButton icon="mdi-chart-line" tooltip="show history" :elevation="isHovering ? 16 : 2"></TooltipButton>
      <TooltipButton icon="mdi-pencil" :tooltip="t('project_card.edit')"></TooltipButton>
      <TooltipButton icon="mdi-delete" :tooltip="t('project_card.remove')"></TooltipButton>
    </div>
    </div>
  </v-hover>-->
</template>

<script setup>
import ParameterHistoryDialog from "@/pages/ParameterHistoryDialog.vue"
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n({ scope: 'global', })

const isShowHistoryDialog = ref(false)

const props = defineProps({
  projectName: String,
  deviceName: String,
  channelName: String,
  channelTitle: String,
  lastModified: Date,
  channelId: Number, 
  value: String,
  unit: String,
})

</script>