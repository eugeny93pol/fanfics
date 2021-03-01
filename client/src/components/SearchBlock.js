import React, {useContext, useState} from 'react'
import {useHttp} from '../hooks/http.hook'

export const SearchBlock = () => {
    const [searchText, setSearchText] = useState('')
    const { loading, error, clearError, request } = useHttp()

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
            <input className="form-control me-2"
                   type="search"
                   onChange={ searchChangeHandler }
                   onKeyPress={ searchPressHandler }
                   value={ searchText }
                   placeholder="Search"
                   aria-label="Search"/>
            <button className="btn btn-outline-dark"
                    type="submit"
                    onClick={ searchHandler }
                    aria-label="Search button"
            ><i className="bi bi-search"/></button>
        </form>
    )
}