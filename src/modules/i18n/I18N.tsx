import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

class I18N {
  static configure(resources)
  {
    i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
    
        keySeparator: false, // we do not use keys in form messages.welcome
    
        interpolation: {
          escapeValue: false // react already safes from xss
        }
      });
  }

  static setLang(lang:string)
  {
    i18n.changeLanguage(lang);
  }
}

export {I18N as default};
