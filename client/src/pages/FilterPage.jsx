import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import queryString from 'query-string'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/loaders/Loader'
import { Filters } from '../components/filter/Filters'
import { ToastServerErrors } from '../components/toast/ToastServerErrors'
import { PublicationPreview } from '../components/publication/PublicationPreview'
import { useThemedClasses } from '../classnames/ThemedClasses'


export const FilterPage = () => {
    const [publications, setPublications] = useState([])
    const [filtered, setFiltered] = useState([])
    const [query, setQuery] = useState(null)
    const history = useHistory()
    const { t, i18n } = useTranslation()
    const { c } = useThemedClasses()
    const { error, clearError, request, loading } = useHttp()

    const deleteHandler = useCallback((id) => {
        setPublications(prev => prev.filter(pub => pub._id !== id))
        setFiltered(prev => prev.filter(pub => pub._id !== id))
    }, [publications, filtered])

    useEffect(async () => {
        const search = queryString.parse(history.location.search)
        const pathname = `/api/publications/${search.field}/${search.id}`
        try {
            const data = await request(pathname, 'GET')
            setPublications(data.publications)
            setFiltered(data.publications)
        } catch (e) {}
        setQuery({...search, name: history.location.state && history.location.state.name})
    },[])

    if (loading) { return <Loader classes={['my-5']}/> }

    return (
        <>
            { query &&
                <section className="mt-3">
                    <h2 className={c.pageTitleClass}
                    >{t(`filter-page.by-${query.field.slice(0, -1)}`)}
                    { query.name &&
                        <span className='badge bg-info ms-2'>
                            { (typeof query.name) === 'string' ?
                                <><i className="bi bi-tag"/> {query.name}</> :
                                query.name[i18n.language]}
                        </span>
                    }
                    </h2>
                </section>
            }
            { !publications.isEmpty && <Filters publications={publications} cbSetFiltered={setFiltered}/> }
            <ToastServerErrors error={error} cbClearError={clearError}/>
            <section className="mt-3">
                {filtered.map((publication) =>
                    <PublicationPreview
                        publication={publication}
                        cbDelete={deleteHandler}
                        key={publication._id}/>
                )}
            </section>
        </>

    )
}