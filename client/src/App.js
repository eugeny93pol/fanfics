import React from 'react'
import bootstrap from 'bootstrap'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeContext } from './context/ThemeContext'
import { LanguageContext } from './context/LanguageContext'
import { AuthContext } from './context/AuthContext'
import { useTheme } from './hooks/theme.hook'
import { useAuth } from './hooks/auth.hook'
import { useRoutes } from './routes/routes'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'


function App() {
    const { token, login, logout, userData, isAuth, ready } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const routes = useRoutes(isAuth)

    if (!ready) {
        return <Loader classes={['my-5']}/>
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <LanguageContext.Provider value='en'>
                <AuthContext.Provider value={{ token, login, logout, userData, isAuth }}>
                    <Router>
                        <Navbar/>
                        <div className="container-md">
                            { routes }
                        </div>
                    </Router>
                </AuthContext.Provider>
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    )
}
export default App