import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { CreatePage } from './CreatePage'
import { ToastServerErrors } from '../components/toast/ToastServerErrors'


export const EditPage = () => {
    const [publication, setPublication] = useState(null)
    const { loading, error, clearError, request } = useHttp()
    const { getToken } = useContext(AuthContext)
    const pageId = useParams().id

    const loadPublication = useCallback(async () => {
        try {
            const token = await getToken()
            const fetched = await request(`/api/publications/edit/${pageId}`, 'GET', null, {
                Authorization: token
            })
            setPublication(fetched.publication)
        } catch (e) {}
    }, [pageId, request])

    useEffect(() => {
        loadPublication()
    },[loadPublication])

    return (
        <>
            { !loading && publication &&
                <CreatePage initial={publication}/>
            }
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </>
    )
}