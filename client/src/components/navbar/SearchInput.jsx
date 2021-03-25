import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { connectSearchBox } from 'react-instantsearch-dom'
import { useThemedClasses } from '../../classnames/ThemedClasses'



const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const callbackRef = useCallback(inputElement => {
        if (inputElement) {
            setTimeout(() =>{
                inputElement.focus()
            },10)
        }
    }, [])

    const submitHandler = (event) => {
        event.preventDefault()
    }


    return (
        <form className="w-100" noValidate onSubmit={submitHandler} role="search">
            <div className="input-group align-items-center">
                <label htmlFor="searchInput"
                       className={c.searchLabelClass}
                ><i className="bi bi-search"/></label>
                <input className={c.searchInputClass}
                       id="searchInput"
                       type="search"
                       onChange={event => refine(event.currentTarget.value)}
                       value={currentRefinement}
                       placeholder={t('search')}
                       aria-label="Search"
                       ref={callbackRef}
                />
                <button
                    type="reset"
                    onClick={() => refine('')}
                    className={c.searchClearClass}
                    disabled={!currentRefinement}
                ><i className="bi bi-backspace"/></button>
            </div>
        </form>
    )
}

export const SearchInput = connectSearchBox(SearchBox)