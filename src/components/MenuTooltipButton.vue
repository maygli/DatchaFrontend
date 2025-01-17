<template>
  <v-menu>
    <template v-slot:activator="{ props: menu }">
      <v-tooltip :location="tooltipLocation">
        <template v-slot:activator="{ props: tooltip }">
          <v-btn rounded="xl" size="large" v-bind="mergeProps(menu, tooltip)" class="text-none">
            <slot name="content"></slot>
          </v-btn>
        </template>
        <span>{{ tooltip }}</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in menuItems" :key="index" :value="index" class="d-flex">
        <v-list-item-title @click="$emit('click', item.value)" class="d-flex text-center">
          <v-icon :icon="item.icon" v-if="item.icon"></v-icon>&nbsp;{{ t(item.title) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { mergeProps } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ scope: 'global', })

defineProps({
  tooltip: String,
  tooltipLocation: String,
  menuItems: Array
})

defineEmits(['click'])
</script>