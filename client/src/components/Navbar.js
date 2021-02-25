import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => {
    const [role, setRole] = useState('guest')
    const [darkMode, setDarkMode] = useState(false)
    const [searchText, setSearchText] = useState('')

    const searchChangeHandler = event => {
        setSearchText(event.target.value)
    }

    const searchPressHandler = event => {
        event.key === 'Enter' && searchHandler()
    }

    const searchHandler = event => {

        try {

        } catch (e) {

        }
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">

                <Link className="navbar-brand" to="/">Mordor</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {role !== 'guest' &&
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" id="profileDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                <li><Link className="dropdown-item" to="/profile">Go to profile</Link></li>
                                <li><Link className="dropdown-item" to="/profile/settings">Settings</Link></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                            </ul>
                        </li>
                        }

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" id="genresDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Genres
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="genresDropdown">
                                <li><Link className="dropdown-item" to="/genre/ ">Genre 1</Link></li>
                                <li><Link className="dropdown-item" to="/genre/">Genre 2</Link></li>
                            </ul>
                        </li>

                        { role === 'admin' &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Users</Link>
                        </li>
                        }

                        <li className="nav-item">
                            <label className="form-check form-switch nav-link" htmlFor="themeSwitcher">
                                <span className="form-check-label">Dark mode</span>
                                <input className="form-check-input" type="checkbox"
                                       id="themeSwitcher"
                                       checked={darkMode}
                                       onChange={ () => setDarkMode(!darkMode) }
                                />
                            </label>
                        </li>
                    </ul>

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

                    <div className="d-flex justify-content-center ms-lg-2 pt-2 pt-lg-0">
                        <Link
                            to={ role === 'guest' ? '/signin' : '/create'}
                            className="btn btn-dark ms-0"
                        >
                            { role === 'guest' ? 'Sign In' : 'Create'}
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    )
}