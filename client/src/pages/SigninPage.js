import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SocialButtons } from '../components/socialButtons/SocialButtons'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../classnames/ThemedClasses'

export const SigninPage = () => {
    const { loading, error, clearError, request } = useHttp()
    const auth = useContext(AuthContext)
    const queryString = require('query-string')
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect( () => {
        //TODO:
        clearError()
    }, [error, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
        //TODO: validate
    }

    const pressHandler = event => {
        event.key === 'Enter' && signinHandler()
    }

    const signinHandler = async () => {
        try {
            const data = await request('/api/auth/signin', 'POST', {...form})
            auth.login(data.token, data.userData)
        } catch (e) { }
    }

    const checkOauth = useCallback(async () => {
        const parsed = queryString.parse(window.location.search)
        if (parsed.code) {
            console.log(parsed.code)
        }
    }, [])

    useEffect(() => {
        checkOauth()
    },[])

    return(
        <main className="form-signup py-5">
            <form className={ c.formClass }>
                <h1 className="h2 mb-4">{t('login')}</h1>

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className={ c.inputClass }
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        autoComplete="username"
                        value={ form.email }
                        onChange={ changeHandler }
                        onKeyPress={ pressHandler }
                        required
                    />
                    <label htmlFor="email">{t('email')}</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className={ c.inputClass }
                        id="password"
                        name="password"
                        placeholder={t('password')}
                        autoComplete="password"
                        value={ form.password }
                        onChange={ changeHandler }
                        onKeyPress={ pressHandler }
                        required
                    />
                    <label htmlFor="password">{t('password')}</label>
                </div>

                <button
                    className={`w-100 btn-lg mb-2 ${c.btnClass}`}
                    type="submit"
                    onClick={ signinHandler }
                    disabled={ loading }
                >{t('signin')}</button>

                <Link to="/signup" className={`w-100 btn-lg ${c.btnSecClass}`}>{t('signup')}</Link>
                <SocialButtons/>
            </form>
        </main>
    )
}