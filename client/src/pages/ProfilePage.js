import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { ProfileInfo } from '../components/ProfileInfo'


export const ProfilePage = () => {
    const { loading, error, clearError, request } = useHttp()
    const { token } = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const pageId = useParams().id

    const loadData = useCallback(async () => {
        try {
            const data = await request(`/api/user/${pageId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(data.user)
        } catch (e) {}
    }, [token, pageId, request])

    const changeUserData = (userData) => {
        setUser(userData)
    }

    useEffect(() => {
        loadData()
    },[loadData])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    if (loading) {
        return <Loader classes={['my-5']}/>
    }

    return (
        <Fragment>
            { !loading && user &&
            <div className="row mt-3">
                <div className="col-md-4 col-lg-3 bg-light py-2">
                    <h4>Profile info</h4>
                    <ProfileInfo user={user} changeUserData={ changeUserData }/>
                </div>
                <div className="col">

                    <h1>Profile Main</h1>
                </div>
            </div>
            }
        </Fragment>
    )
}