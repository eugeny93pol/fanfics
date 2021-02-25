import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes/routes'
import {Navbar} from './components/Navbar'
import bootstrap from 'bootstrap'


function App() {
    const routes = useRoutes()

    return (
        <Router>
            <Navbar/>
            <div className="container">
                { routes }
            </div>
        </Router>
    )
}
export default App