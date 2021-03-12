import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../context/AuthContext'
import { SearchBlock } from './navbar/SearchBlock'
import { LanguageSelector } from './navbar/LanguageSelectior'
import { ThemeSelector } from './navbar/ThemeSelector'
import { useThemedClasses } from '../classnames/ThemedClasses'


export const Navbar = () => {
    const [role, setRole] = useState(null)
    const auth = useContext(AuthContext)
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const logoutHandler = () => {
        auth.logout()
    }

    useEffect(() => {
        setRole(auth.userData ? auth.userData.role : null)
    }, [auth.userData])

    return(
        <nav className={c.navbarClass}>
            <div className="container-xxl">
                <NavLink className="navbar-brand" to="/">{t('site.name')}</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        { auth.isAuth &&
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/profile/${auth.userData.id}`}>
                                <i className="bi bi-person"/>
                                {` ${t('profile')}`}
                            </NavLink>
                        </li>
                        }
                        { role === 'admin' &&
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users">
                                <i className="bi bi-shield-lock"/>
                                {` ${t('admin.panel')}`}
                            </NavLink>
                        </li>
                        }
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#root" id="settingsDropdown" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i className="bi bi-gear"/>
                                {` ${t('settings')}`}</a>
                            <ul className={c.dropdownClass} aria-labelledby="settingsDropdown">
                                <li><div className="dropdown-item nofocus"><ThemeSelector/></div></li>
                                <li><div className="dropdown-item nofocus"><LanguageSelector/></div></li>
                            </ul>
                        </li>
                        { auth.isAuth &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={ logoutHandler }>
                                <i className="bi bi-door-open"/>
                                {` ${t('logout')}`}
                            </Link>
                        </li>
                        }
                    </ul>

                    <SearchBlock/>

                    <div className="d-flex justify-content-center ms-lg-2 pt-2 pt-lg-0">
                        { auth.isAuth ?
                            <NavLink to='/create' className={c.btnClass}>{t('create')}</NavLink> :
                            <NavLink to='/signin' className={c.btnClass}>{t('signin')}</NavLink> }
                    </div>
                </div>
            </div>
        </nav>
    )
}