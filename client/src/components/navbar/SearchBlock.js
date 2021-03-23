import React, { useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'

export const SearchBlock = () => {
    const [text, setText] = useState('')
    const { loading, error, clearError, request } = useHttp()
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const searchChangeHandler = event => {
        setText(event.target.value)
    }

    const searchHandler = async (event) => {
        event.preventDefault()
        if (text.length > 0) {
            try {
                const result = await request(`/api/search/?text=${text}`, 'GET')
                console.log(result.data)
            } catch (e) {

            }
        }
    }

    return (
        <form className="d-flex" onSubmit={ searchHandler }>
            <input className={`me-2 ${c.inputClass}`}
                   type="search"
                   onChange={ searchChangeHandler }
                   value={ text }
                   placeholder={t('search')}
                   aria-label="Search"/>
            <button className={ c.btnOutlineClass }
                    type="submit"
                    aria-label="Search button"
                    disabled={text.length === 0}
            ><i className="bi bi-search"/></button>
        </form>
    )
}