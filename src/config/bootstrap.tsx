import translationsEN from './locales/en/translations.json';
import translationsESP from './locales/es/translations.json';
import {Config} from '../modules/common';

const resources = {
    en: {
        translation: translationsEN
    },
    es: {
      translation: translationsESP
    }
  };


Config.i18nResources = resources;

export default Config;