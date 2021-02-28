import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {MainPage} from '../pages/MainPage'
import {SignupPage} from '../pages/SignupPage'
import {SigninPage} from '../pages/SigninPage'

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path='/' exact component={MainPage}/>
                <Route path='/profile' component={MainPage}/>
                <Route path='/profile/settings' component={MainPage}/>
                <Route path='/publication/:id' component={MainPage}/>
                <Route path='/genre/:id' component={MainPage}/>
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
            <Route path='/publication/:id' component={MainPage}/>
            <Route path='/genre/:id' component={MainPage}/>
            <Route path='/filter/:id' component={MainPage}/>
            <Redirect to='/'/>
        </Switch>
    )
}