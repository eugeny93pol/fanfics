import React, { useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'

export const SearchBlock = () => {
    const [searchText, setSearchText] = useState('')
    const { loading, error, clearError, request } = useHttp()
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const searchChangeHandler = event => {
        setSearchText(event.target.value)
    }

    const searchPressHandler = event => {
        event.key === 'Enter' && searchHandler()
    }

    const searchHandler = async () => {

        try {

        } catch (e) {

        }
    }

    return (
        <form className="d-flex">
            <input className={`me-2 ${c.inputClass}`}
                   type="search"
                   onChange={ searchChangeHandler }
                   onKeyPress={ searchPressHandler }
                   value={ searchText }
                   placeholder={t('search')}
                   aria-label="Search"/>
            <button className={ c.btnOutlineClass }
                    type="submit"
                    onClick={ searchHandler }
                    aria-label="Search button"
            ><i className="bi bi-search"/></button>
        </form>
    )
}