import React, { useCallback, useEffect, useState } from 'react'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'
import { PublicationPreview } from '../components/publication/PublicationPreview'
import { useHttp } from '../hooks/http.hook'
import { LoaderCard } from '../components/loaders/LoaderCard'
import { TagsCloud } from '../components/tags/TagsCloud'
import { Loader } from '../components/loaders/Loader'




export const MainPage = () => {
    const [tags, setTags] = useState(null)
    const [publications, setPublications] = useState(null)
    const [page, setPage] = useState(0)
    const [limit] = useState(10)
    const [sort, setSort] = useState('averageRating')
    const [end, setEnd] = useState(false)
    const { c } = useThemedClasses()
    const { t } = useTranslation()
    const { loading, error, clearError, request } = useHttp()


    const loadPublications = useCallback(async () => {
        try {
            const fetched = await request(`/api/publications/?sort=${sort}&limit=${limit}&p=${page}`,
                'GET', null)
            const loaded = fetched.publications
            if (loaded.length) {
                setPublications(prev => prev ? prev.concat(loaded) : loaded)
            }
            if (loaded.length < limit || !loaded.length) {
                setEnd(true)
            }
        } catch (e) {}
    }, [request, sort, page])

    const loadTags = useCallback(async () => {
        try {
            const fetched = await request(`/api/tags/`, 'GET', null)
            setTags(fetched.tags)
        } catch (e) {}
    }, [request])

    const changeTabHandler = (event) => {
        setPublications(null)
        setPage(0)
        setEnd(false)
        setSort(event.currentTarget.getAttribute('data-sort'))
    }

    const nextPageHandler = () => {
        setPage(page + 1)
    }

    const deleteHandler = useCallback((id) => {
        setPublications(prev => prev.filter(pub => pub._id !== id))
    }, [publications])

    useEffect(() => {
        loadPublications()
    },[sort, page, loadPublications])

    useEffect(() => {
        loadTags()
    },[])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    return(
        <main className={`row mt-4 ${c.textClass}`}>
            <div className="col-lg-8">

                <nav>
                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-top-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-content" type="button" role="tab" aria-controls="nav-content"
                                aria-selected="true"
                                data-sort="averageRating"
                                onClick={ changeTabHandler }>
                            <span className="d-none d-sm-inline">{t('main-page-title.most-rated')}</span>
                            <span className="d-sm-none">{t('main-page-tab-btn.most-rated')}</span>
                        </button>
                        <button className="nav-link" id="nav-last-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-content" type="button" role="tab" aria-controls="nav-content"
                                aria-selected="false"
                                data-sort="updated"
                                onClick={ changeTabHandler }>
                            <span className="d-none d-sm-inline">{t('main-page-title.last-updates')}</span>
                            <span className="d-sm-none">{t('main-page-tab-btn.last-updates')}</span>
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-content" role="tabpanel"
                         aria-labelledby="nav-content-tab">
                        <section className="my-4">
                            <h2 className="visually-hidden">{t('main-page-title.most-rated')}</h2>
                            { !publications && <LoaderCard/>}
                            { publications && publications.map(publication => (
                                <PublicationPreview publication={publication}
                                                    cbDelete={deleteHandler}
                                                    key={publication._id}/>
                            ))}
                        </section>
                    </div>
                </div>
                <div className="text-center mb-5">
                    { publications && loading && <Loader/>}
                    { !loading && !end &&
                        <button role="button" className={c.btnClass}
                                onClick={ nextPageHandler }
                        >{t('main-page-button.more')}</button>
                    }
                </div>
            </div>
            <aside className="col mb-4">
                <h2 className="mb-4">{t('main-page-title.tag-cloud')}</h2>
                <TagsCloud tags={tags}/>
            </aside>
        </main>
    )
}