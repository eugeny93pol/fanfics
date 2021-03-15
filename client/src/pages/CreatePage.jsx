import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'
import { ChapterCreate } from '../components/ChapterCreate'
import { Contents } from '../components/Contents'
import { Loader } from '../components/Loader'
import { nanoid } from 'nanoid'
import { useParams } from 'react-router-dom'
import { PublicationHeadCreate } from '../components/publication/PublicationHeadCreate'


export const CreatePage = () => {
    const [meta, setMeta] = useState({ genres: [], tags: [] })
    const [publication, setPublication] = useState({
        title: '',
        description: '',
        genres: [],
        tags: [],
        chapters: [],
        author: useParams().id
    })

    const { error, clearError, loading, request } = useHttp()
    const { token } = useContext(AuthContext)
    const { c } = useThemedClasses()
    const { t, i18n } = useTranslation()

    const loadData = useCallback(async () => {
        try {
            const fetched = await request(`/api/create/?lang=${i18n.language}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setMeta(fetched)
        } catch (e) {}
    }, [token, request, i18n.language])

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
                chp.id === chapter.id ?
                    {...chp, title: chapter.title, content: chapter.content, files: chapter.files}
                    : chp
            )
        })
    }

    const removeChapter = (id) => {
        setPublication({
            ...publication,
            chapters: publication.chapters.filter(chp => chp.id !== id)
        })
    }

    const addChapterHandler = () => {
        const chapter = {
            title: '',
            content: '',
            files: [],
            id: nanoid(5)
        }

        setPublication({
            ...publication,
            chapters: [...publication.chapters, chapter]
        })
    }

    const saveHandler = () => {
        console.log(publication)
    }

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
            <div className="col-md-3 sidebar-3">
                {publication.chapters.length > 0 &&
                    <Contents chapters={publication.chapters}/>
                }
            </div>
            <div className="col-md-9 ms-auto">
                <PublicationHeadCreate meta={meta} setPublicationHead={changeHeadData}/>

                {publication.chapters.map(chapter =>
                    <ChapterCreate
                        key={chapter.id}
                        index={publication.chapters.indexOf(chapter)}
                        chapter={chapter}
                        changeHandler={changeChapter}
                        removeHandler={removeChapter}
                    />
                )}

                <div className="d-flex justify-content-between my-3">
                    <button className={c.btnClass} onClick={addChapterHandler}>
                        {t('create-page-button.add')}
                    </button>
                    <button className={c.btnClass} onClick={saveHandler}>
                        {t('create-page-button.save')}
                    </button>
                </div>
            </div>
        </div>
        }</>
    )
}