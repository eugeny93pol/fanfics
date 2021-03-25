import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { useHttp } from '../../hooks/http.hook'


export const SearchInput = ({ cbSetResults }) => {
    const { t } = useTranslation()
    const { c } = useThemedClasses()
    const [query, setQuery] = useState('')
    const { error, clearError, request } = useHttp()


    const callbackRef = useCallback(inputElement => {
        if (inputElement) {
            setTimeout(() =>{
                inputElement.focus()
            },10)
        }
    }, [])

    const getSearchResults = useCallback(async () => {
        try {
            const data = await request(`/api/search/?text=${query}`)
            cbSetResults(data.result)
        } catch (e) {}
    }, [request, query])

    const submitHandler = (event) => {
        event.preventDefault()
    }

    const changeHandler = (event) => {
        setQuery(event.target.value)

    }

    useEffect(() => {
        if (query.length) {
            getSearchResults()
        } else {
            cbSetResults(null)
        }
    },[query, getSearchResults])


    return (
        <form className="w-100" noValidate onSubmit={submitHandler} role="search">
            <div className="input-group align-items-center">
                <label htmlFor="searchInput"
                       className={c.searchLabelClass}
                ><i className="bi bi-search"/></label>
                <input className={c.searchInputClass}
                       id="searchInput"
                       type="search"
                       onChange={changeHandler}
                       value={query}
                       placeholder={t('search')}
                       aria-label="Search"
                       ref={callbackRef}
                />
                <button
                    type="reset"
                    onClick={() => setQuery('')}
                    className={c.searchClearClass}
                    disabled={!query.length}
                ><i className="bi bi-backspace"/></button>
            </div>
        </form>
    )
}