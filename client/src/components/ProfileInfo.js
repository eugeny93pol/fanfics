import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from './Loader'


export const ProfileInfo = (props) => {
    const { loading, error, clearError, request } = useHttp()
    const { token } = useContext(AuthContext)
    const [form, setForm] = useState({ name: '', email: '' })

    const user = props.user
    const changeUserData = props.changeUserData

    useEffect(() => {
        setForm({
            name: user.name,
            email: user.email
        })
    },[user])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

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
        } catch (e) { }
    }

    if(loading) {
        return <Loader classes={['spinner-border-sm my-2']}/>
    }

    return (
        <>
            <form>
                <input type="text"
                       className="form-control form-control-plaintext form-edit"
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
                       className="form-control form-control-plaintext form-edit"
                       value={ form.email }
                       onChange={ changeHandler }
                       onKeyPress={ pressHandler }
                       onBlur={ cancelHandler }
                />
            </form>
            }
        </>
    )
}