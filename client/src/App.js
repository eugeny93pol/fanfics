import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeContext } from './context/ThemeContext'
import { LanguageContext } from './context/LanguageContext'
import { AuthContext } from './context/AuthContext'
import { useTheme } from './hooks/theme.hook'
import { useAuth } from './hooks/auth.hook'
import { useRoutes } from './routes/routes'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import { useLanguage } from './hooks/language.hook'
import './i18n/i18n'
import 'bootstrap/dist/js/bootstrap.bundle.min'


function App() {
    const { token, login, logout, userData, isAuth, ready } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const { language, toggleLanguage } = useLanguage()
    const routes = useRoutes(isAuth)

    const loader = <Loader classes={['my-5']}/>

    if (!ready) {
        return loader
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <LanguageContext.Provider value={{ language, toggleLanguage }}>
                <AuthContext.Provider value={{ token, login, logout, userData, isAuth }}>
                    <Router>
                        <Suspense fallback={ loader }>
                            <Navbar/>
                            <div className="container-lg">
                                { routes }
                            </div>
                        </Suspense>
                    </Router>
                </AuthContext.Provider>
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    )
}
export default App