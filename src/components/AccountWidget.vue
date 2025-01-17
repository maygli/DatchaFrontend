<template>
  <span>
    <v-avatar icon="mdi-account" :image="avatar"></v-avatar>
    {{name}}
  </span>
</template>

<script setup>

const props = defineProps({
  id: Number,
  name: String,
  avatar: String,
})

</script>