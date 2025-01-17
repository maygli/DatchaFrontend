<template>
  <div>
    <v-text-field v-model="name" :readonly="loading" :rules="[validateProjectName]" 
      class="mb-2" clearable 
      :label="nameLabel" 
      :prepend-inner-icon="props.nameIcon"
      :placeholder="namePlaceholder">
    </v-text-field>
    <ImageSelector ref="imageSelector" min-height="200" min-width="300" max-height="400" class="mx-auto"
      :imgUrl = "props.imgUrl"
      :help = "imageLoadHelp"
      :placeholder="props.imagePlaceHolder">
    </ImageSelector>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ImageSelector from '@/components/ImageSelector.vue'
const { t } = useI18n({ scope: 'global', })

const props = defineProps({
  name: String,
  imgUrl: String,

  namePlaceholder: String,
  nameIcon: {
    type: String,
    default: "mdi-account"
  },
  nameLabel: String,

  imageLoadhelp: String,
  imagePlaceHolder: {
    type: String,
    default: "mdi-home-city"
  },

  validationMessage: String
})

const name = ref(props.name)
const imageSelector = ref()
const loading = ref(false)

const nameLabel = computed( ()=>{
  return props.nameLabel ? props.nameLabel : t("general_settings.name")
})

const namePlaceholder = computed( ()=>{
  return props.namePlaceholder ? props.namePlaceholder : t("general_settings.enter_name")
})

const imageLoadHelp = computed( ()=>{
  return props.imageLoadhelp ? props.imageLoadhelp : t("general_settings.select_image")
})

const NAME_MIN_LEN = 4

function getImage() {
  return imageSelector.value.getImage();
}

function getName() {
  return name.value
}

function clear() {
  name.value = props.name
  imageSelector.value.clear()
}

defineExpose({
  getImage,
  getName,
  clear
})

function validateProjectName(v) {
  if (!v) {
    return t("validation.required")
  }
  if (v.length < NAME_MIN_LEN) {
    if( props.validationMessage ) {
      return props.validationMessage
    }
    return t("validation.name_len")
  }
}

</script>