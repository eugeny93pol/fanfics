import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { CreatePage } from './CreatePage'


export const EditPage = () => {
    const [publication, setPublication] = useState(null)
    const { loading, error, clearError, request } = useHttp()
    const { token } = useContext(AuthContext)
    const pageId = useParams().id

    const loadPublication = useCallback(async () => {
        try {
            const fetched = await request(`/api/publications/edit/${pageId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setPublication(fetched.publication)
        } catch (e) {}
    }, [token, pageId, request])

    useEffect(() => {
        loadPublication()
    },[loadPublication])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    return (
        <>{ !loading && publication &&
                <CreatePage initial={publication}/>
        }</>
    )
}