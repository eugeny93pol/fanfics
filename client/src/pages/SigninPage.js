import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {SocialButtons} from '../components/SocialButtons'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'

export const SigninPage = () => {
    const {loading, error, clearError, request} = useHttp()
    const auth = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const pressHandler = event => {
        event.key === 'Enter' && signinHandler()
    }

    const signinHandler = async () => {
        try {
            const data = await request('/api/auth/signin', 'POST', {...form})
            auth.login(data.token)
        } catch (e) {

        }
    }

    return(
        <main className="form-signup my-4">
            <form action="">
                <h1 className="h2 mb-4">Sign In</h1>

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
                    onClick={ signinHandler }
                    disabled={ loading }
                >Sign up</button>

                <Link to="/signup" className="w-100 btn btn-lg btn-outline-secondary">Sign Up</Link>
                <SocialButtons/>
            </form>
        </main>
    )
}