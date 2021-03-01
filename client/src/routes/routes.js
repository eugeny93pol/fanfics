import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {MainPage} from '../pages/MainPage'
import {SignupPage} from '../pages/SignupPage'
import {SigninPage} from '../pages/SigninPage'
import {ProfilePage} from '../pages/ProfilePage'
import {SettingsPage} from '../pages/SettingsPage'
import {PublicationPage} from '../pages/PublicationPage'
import {GenresPage} from '../pages/GenresPage'
import {CreatePage} from '../pages/CreatePage'

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path='/' exact component={MainPage}/>
                <Route path='/profile/:id' component={ProfilePage}/>
                <Route path='/settings' component={SettingsPage}/>
                <Route path='/create' component={CreatePage}/>
                <Route path='/publication' component={PublicationPage}/>
                <Route path='/genre/' component={GenresPage}/>
                <Route path='/filter/:id' component={MainPage}/>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/signup' component={SignupPage}/>
            <Route path='/signin' component={SigninPage}/>
            <Route path='/publication' component={PublicationPage}/>
            <Route path='/genre/' component={GenresPage}/>
            <Route path='/filter/:id' component={MainPage}/>
            <Redirect to='/'/>
        </Switch>
    )
}