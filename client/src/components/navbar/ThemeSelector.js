import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { Helmet } from 'react-helmet'

export const ThemeSelector = () => {
    const theme = useContext(ThemeContext)

    const changeTheme = (event) => {
        theme.toggleTheme(event.target.value)
    }

    return (
        <div className="btn-group btn-group-sm w-100" onChange={ changeTheme }>
            <input className="btn-check" id="light" type="radio" value="light" name="theme"
                   defaultChecked={ theme.theme === 'light'}/>
            <label className="btn btn-outline-dark" htmlFor="light" ><i className="bi bi-sun-fill"/></label>
            <input className="btn-check" id="dark" type="radio" value="dark" name="theme"
                   defaultChecked={ theme.theme === 'dark' }/>
            <label className="btn btn-outline-dark" htmlFor="dark"><i className="bi bi-moon-stars-fill"/></label>
            <Helmet>
                <body className={`bg-${theme.theme}`}/>
                <meta name='theme-color' content={ theme.theme === 'dark' ? '#212529' : '#f8f9fa'}/>
            </Helmet>
        </div>
    )
}