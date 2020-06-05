import translationsEN from './locales/en/translations.json';
import translationsESP from './locales/es/translations.json';
import {AppProfile} from '../modules/common';

const services = [
    { 
      "key": "aperture",
      "url": 'http://localhost:300/api/aperture'
    }
  ];

const resources = {
    en: {
        translation: translationsEN
    },
    es: {
      translation: translationsESP
    }
  };


let profile = new AppProfile();
profile.services = services;

export default {
    i18nResources: resources,
    AppProfile: profile
}