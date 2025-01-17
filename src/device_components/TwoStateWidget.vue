<template>
  <v-switch v-model="isOn" @click="onClick()"></v-switch>
</template>

<script setup>
import {ref, watch} from 'vue'
import {sendDeviceCommand} from '@/requests/command_requests.js'

const isOn = ref(false)

watch(isOn,(newValue)=>{
  console.log("Switch watch. Value=", newValue)
})

function onClick() {
  console.log("Click called. Value=", isOn)
  let value = "0"
  if( isOn.value ) {
    value = "1"
  }
  sendDeviceCommand(1, undefined, "state", value)
}

</script>