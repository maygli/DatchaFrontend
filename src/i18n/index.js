import en_loc from "./en.json"
import ru_loc from "./ru.json"
import { en, ru } from 'vuetify/locale'
import { enUS as enDate} from 'date-fns/locale'
import { ru as ruDate} from 'date-fns/locale'

const DEFAULT_DATE_LOCATE="en"

var dateMap = new Map()
dateMap.set('ru',ruDate)
dateMap.set('en',enDate)

export function getDefaultLocale() {
  var language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
    navigator.language ||   // All browsers
    navigator.userLanguage; // IE <= 10
  if (language === null) {
    return "en"
  }
  language = language.toUpperCase()
  console.log(language);
  for (const key of Object.keys(messages)) {
    console.log("key=", key)
    if (language.startsWith(key.toUpperCase())) {
      return key
    }
  }
  return 'en'
}

export function getSupportedLanguages() {
  let result = new Array
  for (const key of Object.keys(messages)) {
    console.log("key=", key)
    result.push(key)
  }
  return result
}

export function getDateLocale(locale) {
  if( dateMap.has(locale) ) {
    return dateMap.get(locale)
  }
  return dateMap.get(DEFAULT_DATE_LOCATE)
}

export const messages = {
  en: {
    $vuetify: {
      ...en
    },
    ...en_loc,
  },
  ru: {
    $vuetify: {
      ...ru
    },
    ...ru_loc,
  },
}