import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { ProfileInfo } from '../components/ProfileInfo'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../classnames/ThemedClasses'


export const ProfilePage = () => {
    const { loading, error, clearError, request } = useHttp()
    const { token } = useContext(AuthContext)
    const [user, setUser] = useState(null)
    const pageId = useParams().id
    const { t } = useTranslation()
    const { c } = useThemedClasses()

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
                <div className={`col-md-4 col-lg-3 me-md-3 ${ c.formClass }`}>
                    <h4><i className="bi bi-person-circle"/>{` ${t('profile.info')}`}</h4>
                    <ProfileInfo user={user} changeUserData={ changeUserData }/>
                </div>
                <div className={`col mt-3 mt-md-0 ${ c.formClass }`}>

                    <h1>Profile Main</h1>
                </div>
            </div>
            }
        </Fragment>
    )
}