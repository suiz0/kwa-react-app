import translationsEN from './locales/en/translations.json';
import translationsESP from './locales/es/translations.json';
import {AppProfile} from '../modules/common';

const resources = {
    en: {
        translation: translationsEN
    },
    es: {
      translation: translationsESP
    }
  };


let profile = new AppProfile();

export default {
    i18nResources: resources,
    AppProfile: profile
}