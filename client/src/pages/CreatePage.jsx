import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'
import { ChapterCreate } from '../components/chapter/ChapterCreate'
import { Loader } from '../components/Loader'
import { nanoid } from 'nanoid'
import { useParams } from 'react-router-dom'
import { PublicationHeadCreate } from '../components/publication/PublicationHeadCreate'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import update from 'immutability-helper'
import { ContentsDraggable } from '../components/contents/ContentsDraggable'
import { isMobile } from "react-device-detect"
import { TouchBackend } from 'react-dnd-touch-backend'


export const CreatePage = () => {
    const [meta, setMeta] = useState({ genres: [], tags: [] })
    const [publication, setPublication] = useState({
        title: '',
        description: '',
        genres: [],
        tags: [],
        chapters: [],
        author: useParams().id,
        _id: ''
    })

    const { error, clearError, loading, request } = useHttp()
    const { token } = useContext(AuthContext)
    const { c } = useThemedClasses()
    const { t } = useTranslation()
    const dragBackend = useMemo(() => isMobile ? TouchBackend : HTML5Backend)

    const loadData = useCallback(async () => {
        try {
            const fetched = await request(`/api/create/`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setMeta(fetched)
        } catch (e) {}
    }, [token, request])

    const saveHandler = useCallback(async () => {
        try {
            const response = await request(`/api/create/`, 'POST', { ...publication }, {
                Authorization: `Bearer ${token}`
            })
            console.log(response.publication)
            setPublication(response.publication)
        } catch (e) {}
    })

    const changeHeadData = (head) => {
        setPublication({
            ...publication,
            title: head.title,
            description: head.description,
            genres: head.genres,
            tags: head.tags
        })
    }

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

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    if (loading) {
        return <Loader classes={['my-5']}/>
    }

    return (
        <>{!loading && meta &&
        <div className={`row mt-3 ${c.textClass}`}>
            <aside className={c.sidebarClass}>
                {publication.chapters.length > 0 &&
                    <ContentsDraggable publication={publication} moveChapter={moveChapter}/>
                }
            </aside>
            <main className="col-md-9 ms-auto">
                <PublicationHeadCreate meta={meta} setPublicationHead={changeHeadData} initial={publication}/>

                <DndProvider backend={dragBackend}>
                    {
                        publication.chapters.map((chapter, i) =>
                            <ChapterCreate
                                key={chapter._id}
                                id={chapter._id}
                                index={i}
                                initial={chapter}
                                changeChapter={changeChapter}
                                removeChapter={removeChapter}
                                moveChapter={moveChapter}
                            />)
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
        }</>
    )
}