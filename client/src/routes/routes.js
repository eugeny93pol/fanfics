import React  from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from '../pages/MainPage'
import { SignupPage } from '../pages/SignupPage'
import { SigninPage } from '../pages/SigninPage'
import { ProfilePage } from '../pages/ProfilePage'
import { PublicationPage } from '../pages/PublicationPage'
import { CreatePage } from '../pages/CreatePage'
import { UsersPage } from '../pages/UsersPage'
import { EditPage } from '../pages/EditPage'
import { FilterPage } from '../pages/FilterPage'

export const useRoutes = (isAuth) => {

    return (
        <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/publication/:id' exact component={PublicationPage}/>
            <Route path='/publications/' exact component={FilterPage}/>

            {!isAuth && <Route path='/signup' exact component={SignupPage}/>}
            {!isAuth && <Route path='/signin' exact component={SigninPage}/>}

            {isAuth && <Route path='/profile/:id' exact component={ProfilePage}/>}
            {isAuth && <Route path='/create' exact component={CreatePage}/>}
            {isAuth && <Route path='/edit/:id' exact component={EditPage}/>}
            {isAuth && <Route path='/users' exact component={UsersPage}/>}

            <Redirect to='/'/>
        </Switch>
    )
}