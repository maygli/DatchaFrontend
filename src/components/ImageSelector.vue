<template>
  <div>
    <v-file-input v-model="image" :label="props.help" accept="image/*"
      prepend-inner-icon="mdi-camera" variant="filled" prepend-icon="" />
    <v-img :src="url" min-height="200" min-width="300" max-height="400" class="mx-auto">
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-icon :icon="props.placeHolder" size="150px" height="100%"></v-icon>
        </div>
      </template>
    </v-img>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ scope: 'global', })

const props = defineProps({
  imgUrl: String,
  help: String,
  placeHolder: {
    type: String,
    default: "mdi-home-city"
  },
})

const imgUrl = ref(props.imgUrl)
const image = ref(null)

const url = computed(() => {
  let val = getImage()
  if (!val) {
    return imgUrl.value
  }
  return URL.createObjectURL(val);
})

function getImage() {
  if (!image.value) {
    return null
  }
  let val = null
  if (Array.isArray(image.value)) {
    val = image.value[0]
  } else {
    val = image.value
  }
  return val
}

function clear() {
  image.value = null
}

defineExpose({
  getImage,
  clear
})

</script>