import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { Loader } from '../loaders/Loader'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { ToastServerErrors } from '../toast/ToastServerErrors'


export const ProfileInfo = ({ user, changeUserData }) => {
    const { loading, error, clearError, request } = useHttp()
    const { token } = useContext(AuthContext)
    const [form, setForm] = useState({ name: '', email: '' })
    const { c } = useThemedClasses()

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const pressHandler = (event) => {
        event.key === 'Enter' && updateUserData()
    }

    const cancelHandler = (event) => {
        setForm({ ...form, [event.target.name]: user[event.target.name] })
    }

    const updateUserData = async () => {
        try {
            const data = await request(`/api/user/update`, 'PATCH',
                { ...form, userId: user._id },
                { Authorization: `Bearer ${token}`
                })
            changeUserData(data.user)
        } catch (e) {
            setForm({ name: user.name, email: user.email })
        }
    }

    useEffect(() => {
        setForm({
            name: user.name,
            email: user.email
        })
    },[user])

    if (loading) {
        return <Loader classes={['spinner-border-sm my-2']}/>
    }

    return (
        <>
            <form>
                <input type="text"
                       className={ c.inputInfoClass }
                       id="name"
                       name="name"
                       value={ form.name }
                       onChange={ changeHandler }
                       onKeyPress={ pressHandler }
                       onBlur={ cancelHandler }
                />
            </form>
            { user.email &&
            <form>
                <input type="email"
                       id="email"
                       name="email"
                       className={ c.inputInfoClass }
                       value={ form.email }
                       onChange={ changeHandler }
                       onKeyPress={ pressHandler }
                       onBlur={ cancelHandler }
                />
            </form>
            }
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </>
    )
}