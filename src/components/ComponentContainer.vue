<template>
  <div d-flex h-25 w-25 class="div-1 vss-movable">
    <v-card class=".vss-movable div-2 v-overlay__content" >
      <v-card-title class=".vss-movable">Movable</v-card-title>
      <v-chip :style="divstyle" class="v-overlay__content">23&deg;</v-chip>
  </v-card>
  </div>
</template>

<script setup>
import ParameterWidget from './ParameterWidget.vue';
import {ref} from 'vue'

const divstyle = ref("left:10px;top:10px")

</script>

<style>
    .div-1 {
        position:relative;
        background-color: #999999;
        height: 500px;
        width: 500px;
    }
    .div-2 {
        position: relative;
        width: 50px;
        height: 50px;
        background-color: blue;
    }
</style>