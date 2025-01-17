<template>
  <v-dialog width="auto" persistent content-class=".vss-movable">
    <v-card>
      <ParameterHistoryWidget
        v-bind = "props"
      >
      </ParameterHistoryWidget>
    <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn @click="emit('close')">{{ t("dialog.ok") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import ParameterHistoryWidget from '@/components/ParameterHistoryWidget.vue'
import {computed} from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ scope: 'global', })

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

const emit = defineEmits(['close'])

const hasValue = computed(()=>{
  if( props.value ) {
    return true
  }
  return fasle
})

const title = computed(()=>{
  if( props.channelTitle ) {
    return props.channelTitle
  }
  if( props.deviceName && props.channelName ) {
    return props.deviceName + ":" + props.channelName
  }
  return ""
})

const parValue = computed(()=>{
  if( !props.value ) {
    return "-"
  }
  var val = props.value
  if( props.unit ) {
    val = val + " " + props.unit
  }
  return val
})

const lastMeasurement = computed(()=>{
  if( !props.lastModified ) {
    return ""
  }
  const options = {
    fractionalSecondDigits: 2
  };
  return props.lastModified.toLocaleString(undefined)
})


</script>