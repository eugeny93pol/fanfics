import React from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export const LanguageSelector = () => {
    const { i18n } = useTranslation()

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value)
    }

    return (
        <div className="btn-group btn-group-sm w-100" onChange={ changeLanguage }>
            <input className="btn-check" id="en" type="radio" value="en" name="language"
                 defaultChecked={ i18n.language === 'en' }/>
            <label className="btn btn-outline-dark w-50" htmlFor="en">English</label>
            <input className="btn-check" id="ru" type="radio" value="ru" name="language"
                   defaultChecked={ i18n.language === 'ru' }/>
            <label className="btn btn-outline-dark w-50" htmlFor="ru">Русский</label>
            <Helmet htmlAttributes={{ lang: i18n.language }}/>
        </div>
    )
}