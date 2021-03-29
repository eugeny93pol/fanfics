import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams, useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/loaders/Loader'
import { ProfileInfo } from '../components/profile/ProfileInfo'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { PublicationPreview } from '../components/publication/PublicationPreview'
import { ToastServerErrors } from '../components/toast/ToastServerErrors'
import { Filters } from '../components/filter/Filters'


export const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const [publications, setPublications] = useState([])
    const [filtered, setFiltered] = useState([])

    const { loading, error, clearError, request } = useHttp()
    const { getToken } = useContext(AuthContext)
    const { t } = useTranslation()
    const { c } = useThemedClasses()
    const history = useHistory()
    const pageId = useParams().id

    const loadData = useCallback(async () => {
        try {
            const token = await getToken()
            const userData = await request(`/api/user/${pageId}`, 'GET', null, {
                Authorization: await token
            })
            setUser(userData.user)
            const userPublications = await request(`/api/publications/user/?user=${pageId}`, 'GET', null, {
                Authorization: await token
            })
            setPublications(userPublications.publications)
            setFiltered(userPublications.publications)
        } catch (e) {}
    }, [ pageId, request])

    const createBtnHandler = () => {
        history.push({
            pathname: `/create`,
            state: { author: user._id }
        })
    }

    const changeUserData = (userData) => {
        setUser(userData)
    }

    const deleteHandler = useCallback((id) => {
        setPublications(prev => prev.filter(pub => pub._id !== id))
        setFiltered(prev => prev.filter(pub => pub._id !== id))
    }, [publications, filtered])

    useEffect(() => {
        loadData()
    },[loadData])

    if (loading) {
        return <Loader classes={['my-5']}/>
    }

    return (
        <>
            <div className={`row mt-3`}>
                { user &&
                    <aside className={c.sidebarClass}>
                        <div className={`${c.formClass}`}>
                            <h4><i className="bi bi-person-circle"/>{` ${t('profile.info')}`}</h4>
                            <ProfileInfo user={user} changeUserData={changeUserData}/>
                        </div>
                        <div className="mt-3 text-center">
                            <button type="button"
                                    className={c.btnClass}
                                    onClick={createBtnHandler}
                            >{t('profile-page.create')}</button>
                        </div>
                    </aside>
                }
                <main className="col-md-9 ms-auto mt-3 mt-md-0">
                    <div className={c.formClass}>
                        <h3 className="mb-3">{t('profile-page.title')}</h3>
                        { !publications.isEmpty ?
                            <Filters publications={ publications } cbSetFiltered={ setFiltered }/>
                            : t('profile-page.no-publications')
                        }
                    </div>

                    <section className="mt-3">
                        {filtered.map((publication) =>
                            <PublicationPreview
                                publication={publication}
                                cbDelete={deleteHandler}
                                key={publication._id}/>
                        )}
                    </section>
                </main>
            </div>
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </>
    )
}