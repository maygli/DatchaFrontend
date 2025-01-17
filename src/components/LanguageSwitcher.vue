<template>
  <MenuTooltipButton :menuItems="buildLocales()" @click="onLangChanged" tooltip="Change language"
    tooltipLocation="bottom">
    <template v-slot:content>
      <v-icon>mdi-earth</v-icon>
      {{ locale.toUpperCase() }}
    </template>
  </MenuTooltipButton>
  <!--  <v-menu>
    <template v-slot:activator="{ props: menu }">
      <v-tooltip location="top">
        <template v-slot:activator="{ props: tooltip }">
          <v-btn prepend-icon="mdi-earth" rounded size="large" :text="locale" v-bind="mergeProps(menu, tooltip)">
          </v-btn>
        </template>
<span>Change language</span>
</v-tooltip>
</template>
<v-list>
  <v-list-item v-for="(item, index) in items" :key="index" :value="index">
    <v-list-item-title @click="onLangChanged(item.value)">{{ item.title }}</v-list-item-title>
  </v-list-item>
</v-list>
</v-menu>
-->
</template>

<script setup>
//import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
//import { mergeProps } from 'vue'
import MenuTooltipButton from './MenuTooltipButton.vue';

const { t, te, locale, availableLocales } = useI18n()
//console.log("te=", te)
//const items = ref(buildLocales())

//availableLocales.forEach((item) => { console.log("item=", item) })

function buildLocales() {
  let result = []
  availableLocales.forEach(currLocale => {
    let localeItem = {
      title: te('language.name', currLocale) ? t('language.name', "", { locale: currLocale }) : currLocale,
      value: currLocale
    }
    result.push(localeItem);
  });
  console.log("Result=", result)
  return result
}

function onLangChanged(newLocale) {
  locale.value = newLocale
}

</script>
