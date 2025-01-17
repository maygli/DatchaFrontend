<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card :title="title" :elevation="isHovering ? 12 : 2" v-bind="props" min-width="280px"
      :variant="isHovering ? 'outlined' : 'elevated'">
      <v-card-item>
        <span><ParameterWidget 
            v-for="cardItem in cardItems"
            :project-name="title"
            :device-name="cardItem.device_name"
            :channel-name="cardItem.channel_name"
            :channel-id="cardItem.channel_id"
            :value="cardItem.last_value" 
            :unit="getUnit(cardItem.unit)"
            :last-modified="convertDate(cardItem.timestamp)"></ParameterWidget>
          <TwoStateWidget></TwoStateWidget>
        </span>
      </v-card-item>
      <v-card-item fluid height="100%" justify-center>
        <v-img :src="imageSrc" class="d-flex text-right align-end" min-height="150px" height="200px">
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-icon icon="mdi-home-city" size="150px" height="100%"></v-icon>
            </div>
          </template>
          <div :class="isHovering ? 'd-block' : 'd-none'" width="100%">
            <TooltipButton icon="mdi-location-enter" :tooltip="t('project_card.enter')"></TooltipButton>
            <TooltipButton icon="mdi-pencil" :tooltip="t('project_card.edit')" @click="isShowPropertyDialog=true"></TooltipButton>
            <TooltipButton icon="mdi-delete" :tooltip="t('project_card.remove')" @click="$emit('deleteproject', id)"></TooltipButton>
          </div>
        </v-img>
      </v-card-item>
    </v-card>
    <EditProjectPropertiesDialog 
        v-model="isShowPropertyDialog"
        :name = "title"
        :img-url="imageSrc"
        :id = "id"
        @close = "isShowPropertyDialog=false"
    >
    </EditProjectPropertiesDialog>
  </v-hover>
</template>

<script setup>

import TooltipButton from '@/components/TooltipButton.vue'
import ParameterWidget from '@/components/ParameterWidget.vue'
import TwoStateWidget from '@/device_components/TwoStateWidget.vue'

import EditProjectPropertiesDialog from '@/pages/EditProjectPropertiesDialog.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ scope: 'global', })

defineEmits(['deleteproject'])

const props = defineProps({
  id: Number,
  title: String,
  imageSrc: String,
  cardItems: Array
})

const isShowPropertyDialog = ref(false)

function getUnit(x) {
  if( !x ) {
    return ""
  }
  let convUnit = t("unit." + x)
  console.log("Conv unit="+convUnit)
  try{
    let txt = document.createElement("textarea");
    txt.innerHTML = convUnit;
    let resUnit = txt.value;
    console.log("Res unit=", resUnit)
    return resUnit
  } catch(e) {
    console.log("exception - return unescape");
    return convUnit
  }
}

function convertDate(x) {
  let date = new Date(Date.parse(x))
  return date
}

function onDelete(id) {
  console.log("onDelete called")
  $emit('deleteproject', id)
}
</script>