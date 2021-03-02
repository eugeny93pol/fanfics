import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import { useHttp} from '../hooks/http.hook'
import { Loader } from '../components/Loader'


export const ProfilePage = () => {
    const { loading, error, clearError, request } = useHttp()
    const { token } = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const [form, setForm] = useState({
        name: '', email: ''
    })
    const pageId = useParams().id

    const loadData = useCallback(async () => {
        try {
            const data = await request(`/api/user/${pageId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(data.user)
            setForm({ name: data.user.name, email: data.user.email })
        } catch (e) {}
    }, [token, pageId, request])

    useEffect(() => {
        loadData()
    },[loadData])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])


    const changeUserHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const pressUserHandler = (event) => {
        event.key === 'Enter' && updateUserData()
    }

    const updateUserData = async () => {
        try {
            const data = await request(`/api/user/update`, 'PATCH',
                { ...form, userId: user._id },
                { Authorization: `Bearer ${token}`
            })
            setUser(data.user)
        } catch (e) {
            await loadData()
        }
    }

    const cancelUserHandler = (event) => {
        setForm({ ...form, [event.target.name]: user[event.target.name] })
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <Fragment>
            { !loading && user &&
            <div className="row mt-3">
                <div className="col-sm-4 col-lg-3 bg-light py-2">
                    <form>
                        <h4>Profile info</h4>
                        <input type="text"
                               className="form-control form-control-plaintext form-edit"
                               id="userName"
                               name="name"
                               value={ form.name }
                               onChange={ changeUserHandler }
                               onKeyPress={ pressUserHandler }
                               onBlur={ cancelUserHandler }
                        />
                        { user.email &&
                        <input type="email"
                               name="email"
                               className="form-control form-control-plaintext form-edit"
                               id="userEmail"
                               value={ form.email }
                               onChange={ changeUserHandler }
                               onKeyPress={ pressUserHandler }
                               onBlur={ cancelUserHandler }
                        />
                        }
                    </form>
                </div>
                <div className="col">

                    <h1>Profile Main</h1>
                </div>
            </div>
            }
        </Fragment>
    )
}