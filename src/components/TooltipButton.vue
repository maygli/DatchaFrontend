<template>
  <v-tooltip v-model="showTooltip" :location="tooltipLocation">
    <template v-slot:activator="{ props }">
      <v-btn :icon="icon" v-bind="props" v-if="dontShowText" @click="$emit('click')"></v-btn>
      <v-btn v-bind="props" rounded="xl" size="large" class="text-none" @click="$emit('click')" v-else>
        <slot>
          <v-icon>
            {{ icon }}
          </v-icon>
          {{ text }}
        </slot>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue';

const props = defineProps({
  icon: String,
  text: String,
  tooltip: String,
  tooltipLocation: String,
  showText: {
    type: Boolean,
    default: true
  },
})

defineEmits(['click'])

const showTooltip = ref(false)
const dontShowText = computed(() => { return (props.showText == false) || (!props.text || props.text.length === 0) })

</script>