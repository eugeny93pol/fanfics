import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SocialButtons } from '../components/SocialButtons'
import { useHttp } from '../hooks/http.hook'
import { useThemedClasses } from '../classnames/ThemedClasses'

export const SignupPage = () => {
    const { loading, error, clearError, request } = useHttp()
    const { t } = useTranslation()
    const { c } = useThemedClasses()
    const [form, setForm] = useState({
        name: '', email: '', password: ''
    })
    const history = useHistory()


    useEffect( () => {
        clearError()
    }, [error, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
        //TODO: validate
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
        <main className="form-signup py-5">
            <form className={ c.formClass }>
                <h1 className="h2 mb-4">{t('registration')}</h1>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={ c.inputClass }
                        id="name"
                        name="name"
                        placeholder={t('name')}
                        value={ form.name }
                        onChange={ changeHandler }
                        onKeyPress={ pressHandler }
                        required
                    />
                    <label htmlFor="name">{t('name')}</label>
                </div>

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
                        autoComplete="new-password"
                        value={ form.password }
                        onChange={ changeHandler }
                        onKeyPress={ pressHandler }
                        required
                    />
                    <label htmlFor="password">{t('password')}</label>
                    <div className="form-text">
                        {t('password.hint')}
                    </div>
                </div>

                <button
                    className={`w-100 btn-lg mb-2 ${c.btnClass}`}
                    type="submit"
                    onClick={ signupHandler }
                    disabled={ loading }
                >{t('signup')}</button>
                <Link to="/signin" className={`w-100 btn-lg mb-2 ${c.btnSecClass}`}>{t('signin')}</Link>
                <SocialButtons/>
            </form>
        </main>
    )
}