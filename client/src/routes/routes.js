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
                <Route path='/profile/:id' exact component={ProfilePage}/>
                <Route path='/settings' exact component={SettingsPage}/>
                <Route path='/create' exact component={CreatePage}/>
                <Route path='/publication' exact component={PublicationPage}/>
                <Route path='/genre/' exact component={GenresPage}/>
                <Route path='/filter/:id' exact component={MainPage}/>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/signup' exact component={SignupPage}/>
            <Route path='/signin' exact component={SigninPage}/>
            <Route path='/publication' exact component={PublicationPage}/>
            <Route path='/genre/' exact component={GenresPage}/>
            <Route path='/filter/:id' exact component={MainPage}/>
            <Redirect to='/'/>
        </Switch>
    )
}