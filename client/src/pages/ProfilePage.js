import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { ProfileInfo } from '../components/ProfileInfo'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { PublicationPreview } from '../components/publication/PublicationPreview'


export const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const [publications, setPublications] = useState([])

    const { loading, error, clearError, request } = useHttp()
    const { token } = useContext(AuthContext)
    const pageId = useParams().id
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const loadData = useCallback(async () => {
        try {
            const userData = await request(`/api/user/${pageId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(userData.user)

            const userPublications = await request(`/api/publications/?user=${pageId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setPublications(userPublications.publications)
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
        <>
            <div className={`row mt-3`}>
                <aside className={c.sidebarClass}>
                    <div className={`${ c.formClass }`}>
                        <h4><i className="bi bi-person-circle"/>{` ${t('profile.info')}`}</h4>
                        { !loading && user && <>
                            <ProfileInfo user={user} changeUserData={ changeUserData }/>
                        </>}
                    </div>
                    <div className="mt-3 text-center">
                        <Link to={`/${pageId}/create`}
                              className={c.btnClass}
                        >{t('profile-page.create')}</Link>
                    </div>
                </aside>
                <main className="col-md-9 ms-auto mt-3 mt-md-0">
                    <div className={c.formClass}>
                        <h3 className="mb-3">{t('profile-page.title')}</h3>
                        <div className={c.formClass}>Sort</div>
                    </div>

                    <section className="mt-3">
                        {publications.map((publication) =>
                            <PublicationPreview publication={publication} key={publication._id}/>
                        )}
                    </section>
                </main>
            </div>

        </>
    )
}