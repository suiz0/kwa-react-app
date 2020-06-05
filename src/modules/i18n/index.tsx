import i18n from 'i18next';
import I18N from './I18N';

export {i18n};

export default {
    setLang: (lang: string) => {
        I18N.setLang(lang);
    },
    configure: (resources) => {
        I18N.configure(resources);
    },
    name: 'i18n'
}