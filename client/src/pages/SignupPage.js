import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {SocialButtons} from '../components/SocialButtons'
import {useHttp} from '../hooks/http.hook'

export const SignupPage = () => {
    const {loading, error, clearError, request} = useHttp()
    const [form, setForm] = useState({
        name: '', email: '', password: ''
    })
    const history = useHistory()

    useEffect( () => {
        clearError()
    }, [error])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const pressHandler = event => {
        event.key === 'Enter' && signupHandler()
    }

    const signupHandler = async () => {
        try {
            const data = await request('/api/auth/signup', 'POST', {...form})
            if (data) {
                history.push('/signin')
            }
        } catch (e) { }
    }

    return(
        <main className="form-signup my-4">
            <form action="">
                <h1 className="h2 mb-4">Registration</h1>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={ form.name }
                        onChange={ changeHandler }
                        onKeyPress={ pressHandler }
                        required
                    />
                    <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        autoComplete="username"
                        value={ form.email }
                        onChange={ changeHandler }
                        onKeyPress={ pressHandler }
                        required
                    />
                    <label htmlFor="email">Email address</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={ form.password }
                        onChange={ changeHandler }
                        onKeyPress={ pressHandler }
                        required
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <button
                    className="w-100 btn btn-lg btn-dark mb-2"
                    type="submit"
                    onClick={ signupHandler }
                    disabled={ loading }
                >Sign Up</button>
                <Link to="/signin" className="w-100 btn btn-lg btn-outline-secondary">Sign In</Link>
                <SocialButtons/>
            </form>
        </main>
    )
}