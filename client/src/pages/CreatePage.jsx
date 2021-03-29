import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'
import { ChapterCreate } from '../components/chapter/ChapterCreate'
import { Loader } from '../components/loaders/Loader'
import { nanoid } from 'nanoid'
import { useHistory } from 'react-router-dom'
import { PublicationHeadCreate } from '../components/publication/PublicationHeadCreate'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import update from 'immutability-helper'
import { ContentsDraggable } from '../components/contents/ContentsDraggable'
import { isMobile } from "react-device-detect"
import { TouchBackend } from 'react-dnd-touch-backend'
import { ToastServerErrors } from '../components/toast/ToastServerErrors'


export const CreatePage = ({ initial }) => {
    const [meta, setMeta] = useState({ genres: [], tags: [] })
    const [publication, setPublication] = useState( initial || {
        title: '',
        description: '',
        genres: [],
        tags: [],
        chapters: [],
        author: '',
        _id: ''
    })

    const { error, clearError, loading, request } = useHttp()
    const { getToken, userData } = useContext(AuthContext)
    const { c } = useThemedClasses()
    const { t } = useTranslation()
    const history = useHistory()
    const dragBackend = useMemo(() => isMobile ? TouchBackend : HTML5Backend)

    const loadData = useCallback(async () => {
        try {
            const token = await getToken()
            const fetched = await request('/api/create/', 'GET', null, {
                Authorization: token
            })
            setMeta(fetched)
        } catch (e) {}
    }, [request])

    const saveHandler = useCallback(async () => {
        try {
            const token = await getToken()
            const response = await request('/api/publications/', 'POST', { ...publication }, {
                Authorization: token
            })
            history.push(`/publication/${response.publication._id}`)
        } catch (e) {}
    }, [request, publication])

    const changeHeadData = useCallback((head) => {
        setPublication({
            ...publication,
            title: head.title,
            description: head.description,
            genres: head.genres,
            tags: head.tags
        })
    },[publication])

    const changeChapter = (chapter) => {
        setPublication({
            ...publication,
            chapters: publication.chapters.map(chp =>
                chp._id === chapter._id ?
                    {...chp, title: chapter.title, content: chapter.content, files: chapter.files}
                    : chp
            )
        })
    }

    const removeChapter = (id) => {
        setPublication({
            ...publication,
            chapters: publication.chapters.filter(chp => chp._id !== id)
        })
    }

    const addChapterHandler = () => {
        setPublication({
            ...publication,
            chapters: [...publication.chapters, {
                title: '',
                content: '',
                files: [],
                _id: nanoid(5)
            }]
        })
    }

    const moveChapter = useCallback((dragIndex, hoverIndex) => {
        const dragChapter = publication.chapters[dragIndex]
        setPublication({
            ...publication,
            chapters: update(publication.chapters, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragChapter]]
            })
        })
    }, [publication.chapters])

    useEffect(() => {
        loadData()
    }, [loadData])

    useEffect(() => {
        const author = history.location.state ? history.location.state.author : userData.id
        !publication.author && setPublication({...publication, author})
    }, [])

    if (loading) { return <Loader classes={['my-5']}/> }

    return (
        <>{!loading && meta &&
        <div className={`row mt-3 ${c.textClass}`}>
            <aside className={c.sidebarClass}>
                { publication.chapters.length > 0 &&
                    <ContentsDraggable publication={publication} moveChapter={moveChapter}/>
                }
            </aside>
            <main className="col-md-9 ms-auto">
                <PublicationHeadCreate meta={meta} setPublicationHead={changeHeadData} initial={publication}/>

                <DndProvider backend={dragBackend}>
                    {
                        publication.chapters.map((chapter, i) =>
                            <div className="anchorScroll" id={`chapter${i}`} key={chapter._id}>
                                <ChapterCreate
                                    id={chapter._id}
                                    index={i}
                                    initial={chapter}
                                    changeChapter={changeChapter}
                                    removeChapter={removeChapter}
                                    moveChapter={moveChapter}
                                />
                            </div>
                            )
                    }
                </DndProvider>

                <div className="d-flex justify-content-between my-3">
                    <button className={c.btnClass} onClick={addChapterHandler}>
                        {t('create-page-button.add')}
                    </button>
                    <button className="btn btn-info"
                            onClick={saveHandler}
                            disabled={publication.title.length < 2}
                    >
                        {t('create-page-button.save')}
                    </button>
                </div>
            </main>
        </div>
        }
        <ToastServerErrors error={error} cbClearError={clearError}/>
        </>
    )
}