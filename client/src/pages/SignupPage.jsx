import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useHttp } from '../hooks/http.hook'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { ToastServerErrors } from '../components/toast/ToastServerErrors'
import { useForm } from 'react-hook-form'

export const SignupPage = () => {
    const { loading, error, clearError, request } = useHttp()
    const { t } = useTranslation()
    const { c } = useThemedClasses()
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm()

    const submitHandler = async (form) => {
        try {
            const data = await request('/api/auth/signup', 'POST', {...form})
            if (data) {
                history.push('/signin')
            }
        } catch (e) { }
    }

    return(
        <main className="form-signup py-5">
            <form className={ c.formClass } onSubmit={ handleSubmit(submitHandler) }>
                <h1 className="h2 mb-4">{t('registration')}</h1>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={`${c.inputClass} ${errors.name && 'is-invalid'}`}
                        id="name"
                        name="name"
                        placeholder={t('name')}
                        ref={register({ required: true, maxLength: 80 })}
                    />
                    <label htmlFor="name">{t('name')}</label>
                </div>

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
                        autoComplete="new-password"
                        ref={register({ required: true, minLength: 6 })}
                    />
                    <label htmlFor="password">{t('password')}</label>
                    <div className="form-text">
                        {t('password.hint')}
                    </div>
                </div>

                <button
                    className={`w-100 btn-lg mb-2 ${c.btnClass}`}
                    type="submit"
                    disabled={ loading }
                >{t('signup')}</button>
                <Link to="/signin" className={`w-100 btn-lg mb-2 ${c.btnSecClass}`}>{t('signin')}</Link>
            </form>
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </main>
    )
}