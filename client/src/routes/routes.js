import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {MainPage} from '../pages/MainPage'
import {SignupPage} from '../pages/SignupPage'
import {SigninPage} from '../pages/SigninPage'

export const useRoutes = () => {
    return (
        <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/signup' component={SignupPage}/>
            <Route path='/signin' component={SigninPage}/>
            <Redirect to='/'/>
        </Switch>
    )
}