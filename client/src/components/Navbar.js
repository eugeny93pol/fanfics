import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { SearchBlock } from './SearchBlock'
import { ThemeContext } from '../context/ThemeContext'

export const Navbar = () => {
    const [role, setRole] = useState(null)
    const auth = useContext(AuthContext)
    const theme = useContext(ThemeContext)
    const history = useHistory()

    const logoutHandler = () => {
        auth.logout()
    }

    const toggleThemeHandler = () => {
        theme.toggleTheme(!theme.theme)
    }

    useEffect(() => {
        setRole(auth.user ? auth.user.role : null)
    }, [auth.user])

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">

                <NavLink className="navbar-brand" to="/">Mordor</NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        { auth.isAuth &&
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" id="profileDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false" to="">
                                Profile
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to={`/profile/${auth.user.id}`}
                                    >Go to profile</NavLink>
                                </li>
                                <li><NavLink className="dropdown-item" to="/settings">Settings</NavLink></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/logout"
                                        onClick={ logoutHandler }
                                    >Logout</NavLink>
                                </li>
                            </ul>
                        </li>
                        }

                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" id="genresDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false" to="">
                                Genres
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="genresDropdown">
                                <li><NavLink className="dropdown-item" to="/genre/">Genre 1</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/genre/">Genre 2</NavLink></li>
                            </ul>
                        </li>

                        { role === 'admin' &&
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users">Users</NavLink>
                        </li>
                        }

                        <li className="nav-item">
                            <label className="form-check form-switch nav-link" htmlFor="themeSwitcher">
                                <span className="form-check-label">Dark mode</span>
                                <input className="form-check-input" type="checkbox"
                                       id="themeSwitcher"
                                       checked={ theme.theme }
                                       onChange={ toggleThemeHandler }
                                />
                            </label>
                        </li>
                    </ul>

                    <SearchBlock/>

                    <div className="d-flex justify-content-center ms-lg-2 pt-2 pt-lg-0">
                        { !auth.isAuth && <NavLink to='/signin' className="btn btn-dark ms-0">Sign In</NavLink> }
                        { auth.isAuth && <NavLink to='/create' className="btn btn-dark ms-0">Create</NavLink> }
                    </div>

                </div>
            </div>
        </nav>
    )
}