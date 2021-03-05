import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { SelectGenres } from '../components/SelectGenres'
import { SelectTags } from '../components/SelectTags'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { LanguageContext } from '../context/LanguageContext'

export const CreatePage = () => {
    const [chapter, setChapters] = useState([])
    const [genres, setGenres] = useState([])
    const [tags, setTags] = useState([])
    const [meta, setMeta] = useState({ genres: [], tags: [] })


    const { error, clearError, loading, request } = useHttp()
    const { token } = useContext(AuthContext)
    const { language } = useContext(LanguageContext)

    const loadData = useCallback(async () => {
        try {
            const fetched = await request(`/api/create/?lang=${language}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setMeta(fetched)
        } catch (e) {}
    }, [token, request, language])

    useEffect(() => {
        loadData()
    }, [loadData])

    useEffect(() => {
        console.log(genres)
    }, [genres])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    return (
    <div className="row mt-3">
        <div className="col-md-3">
            <div className="nav-wrapper d-none d-md-block position-fixed">
                <h3>Contents</h3>
                <nav className="navbar navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#chapter1">Chapter 1 Name</a>
                            <a className="nav-link" aria-current="page" href="#chapter2">Chapter 2 Name</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div className="col">
            <h2>Create your fanfic</h2>
            <form className="p-3 border rounded-3">
                <div className="mb-3">
                    <label htmlFor="publicationTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="publicationTitle"
                           placeholder="Enter title of your fanfic"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="publicationDescription" className="form-label">Summary</label>
                    <textarea className="form-control" id="publicationDescription" rows="3"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputGenres" className="form-label">Genres</label>
                    <SelectGenres genres={ meta.genres } callback={ setGenres }/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputTags" className="form-label">Tags</label>
                    <SelectTags genres={ meta.tags } />
                </div>
            </form>
        </div>
    </div>
    )
}