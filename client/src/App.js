import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { InstantSearch } from 'react-instantsearch-dom'
import { ThemeContext } from './context/ThemeContext'
import { AuthContext } from './context/AuthContext'
import { useTheme } from './hooks/theme.hook'
import { useAuth } from './hooks/auth.hook'
import { useRoutes } from './routes/routes'
import { Navbar } from './components/navbar/Navbar'
import { Loader } from './components/loaders/Loader'
import searchClient from './search/searchClient'
import './i18n/i18n'
import 'bootstrap/dist/js/bootstrap.bundle.min'


function App() {
    const { token, login, logout, userData, isAuth, ready } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const routes = useRoutes(isAuth)
    const loader = <Loader classes={['my-5']}/>

    if (!ready) {
        return loader
    }

    return (
        <HelmetProvider>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <AuthContext.Provider value={{ token, login, logout, userData, isAuth }}>
                    <Router>
                        <Suspense fallback={ loader }>
                            <InstantSearch indexName="global" searchClient={searchClient}>
                                <Navbar/>
                                <div className="container-lg">{ routes }</div>
                            </InstantSearch>
                        </Suspense>
                    </Router>
                </AuthContext.Provider>
            </ThemeContext.Provider>
        </HelmetProvider>
    )
}
export default App