import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import languageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
    .use(Backend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: '/assets/i18n/{{ns}}/{{lng}}.json'
        },

        fallbackLng: 'en',
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        react: {
            useSuspense: true
        },

    })

export default i18n