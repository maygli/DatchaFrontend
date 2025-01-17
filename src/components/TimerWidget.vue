<template>
  {{ currMsg }}
  &nbsp;
  <span>
    {{ currCount }}
    &nbsp;
    {{ t('timer_widget.secs') }}
  </span>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ scope: 'global', })

const props = defineProps({
  interval: {
    type: Number,
    default: 60
  },
  message: String
})

const currCount = ref(props.interval)
const currMsg = ref(props.message)

let intervalId = null

const emit = defineEmits(['timeout'])

onBeforeMount(() => {
  restartTimer()
})

function restartTimer() {
  clearInterval(intervalId)
  currCount.value = props.interval
  intervalId = setInterval(updateCounter, 1000)
}

defineExpose({
  restartTimer
})

function updateCounter() {
  if (currCount.value > 0) {
    currCount.value--;
    return
  }
  clearInterval(intervalId)
  emit('timeout')
}
</script>