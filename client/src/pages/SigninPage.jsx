import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../context/AuthContext'
import { SocialButtons } from '../components/socialButtons/SocialButtons'
import { useHttp } from '../hooks/http.hook'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { ToastServerErrors } from '../components/toast/ToastServerErrors'


export const SigninPage = () => {
    const { loading, error, clearError, request } = useHttp()
    const auth = useContext(AuthContext)
    const { t } = useTranslation()
    const { c } = useThemedClasses()
    const { register, handleSubmit, errors } = useForm()

    const submitHandler = async (form) => {
        try {
            const data = await request('/api/auth/signin', 'POST', {...form})
            auth.login(data.token, data.refreshToken)
        } catch (e) { }
    }

    return(
        <main className="form-signup py-5">
            <form className={ c.formClass } onSubmit={ handleSubmit(submitHandler) }>
                <h1 className="h2 mb-4">{t('login')}</h1>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={`${c.inputClass} ${errors.email && 'is-invalid'}`}
                        id="email"
                        name="email"
                        placeholder="name@example.com"
                        autoComplete="username"
                        ref={register({ required: true, pattern: /.+@.+\..+/i })}
                    />
                    <label htmlFor="email">{t('email')}</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className={`${c.inputClass} ${errors.password && 'is-invalid'}`}
                        id="password"
                        name="password"
                        placeholder={t('password')}
                        autoComplete="password"
                        ref={register({ required: true })}
                    />
                    <label htmlFor="password">{t('password')}</label>
                </div>

                <button
                    className={`w-100 btn-lg mb-2 ${c.btnClass}`}
                    type="submit"
                    disabled={ loading }
                >{t('signin')}</button>

                <Link to="/signup" className={`w-100 btn-lg ${c.btnSecClass}`}>{t('signup')}</Link>
                <SocialButtons/>
            </form>
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </main>
    )
}