import React  from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from '../pages/MainPage'
import { SignupPage } from '../pages/SignupPage'
import { SigninPage } from '../pages/SigninPage'
import { ProfilePage } from '../pages/ProfilePage'
import { SettingsPage } from '../pages/SettingsPage'
import { PublicationPage } from '../pages/PublicationPage'
import { GenresPage } from '../pages/GenresPage'
import { CreatePage } from '../pages/CreatePage'
import { UsersPage } from '../pages/UsersPage'

export const useRoutes = (isAuth) => {

    return (
        <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/publication' exact component={PublicationPage}/>
            <Route path='/genre/' exact component={GenresPage}/>
            <Route path='/filter/:id' exact component={MainPage}/>

            {!isAuth && <Route path='/signup' exact component={SignupPage}/>}
            {!isAuth && <Route path='/signin' exact component={SigninPage}/>}
            {!isAuth && <Route path='/oauth/vk' exact component={SigninPage}/>}


            {isAuth && <Route path='/profile/:id' exact component={ProfilePage}/>}
            {isAuth && <Route path='/settings' exact component={SettingsPage}/>}
            {isAuth && <Route path='/:id/create' exact component={CreatePage}/>}
            {isAuth && <Route path='/users' exact component={UsersPage}/>}

            <Redirect to='/'/>
        </Switch>
    )
}