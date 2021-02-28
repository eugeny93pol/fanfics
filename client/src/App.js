import React from 'react'
import bootstrap from 'bootstrap'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes/routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {ThemeContext} from './context/ThemeContext'
import {LanguageContext} from './context/LanguageContext'
import {Navbar} from './components/Navbar'


function App() {
    const {token, login, logout, isAuth} = useAuth()
    const routes = useRoutes(isAuth)

    return (
        <ThemeContext.Provider value='light'>
            <LanguageContext.Provider value='en'>
                <AuthContext.Provider value={{ token, login, logout, isAuth }}>
                    <Router>
                        <Navbar/>
                        <div className="container">
                            { routes }
                        </div>
                    </Router>
                </AuthContext.Provider>
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    )
}
export default App