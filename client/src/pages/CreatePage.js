import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'
import { ChapterCreate } from '../components/ChapterCreate'
import { Contents } from '../components/Contents'
import { Loader } from '../components/Loader'
import { nanoid } from 'nanoid'
import { SelectGenres } from '../components/SelectGenres'
import { SelectTags } from '../components/SelectTags'
import { useParams } from 'react-router-dom'


export const CreatePage = () => {
    const [chapters, setChapters] = useState([])
    const [genres, setGenres] = useState([])
    const [tags, setTags] = useState([])
    const [meta, setMeta] = useState({ genres: [], tags: [] })

    const { error, clearError, loading, request } = useHttp()
    const { token } = useContext(AuthContext)
    const { c } = useThemedClasses()
    const { t, i18n } = useTranslation()

    const pageId = useParams().id

    const loadData = useCallback(async () => {
        try {
            const fetched = await request(`/api/create/?lang=${i18n.language}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setMeta(fetched)
        } catch (e) {}
    }, [token, request, i18n.language])

    const changeChapter = (chapter) => {
        setChapters(chapters.map(
            chp => chp.id === chapter.id ? {...chp, title: chapter.title, content: chapter.content} : chp
        ))
        console.log(chapter)
    }

    const removeChapter = (id) => {
        setChapters(chapters.filter(chp => chp.id !== id))
    }

    const addChapterHandler = () => {
        const chapter = {
            title: '',
            content: '',
            id: nanoid(5)
        }
        setChapters([...chapters, chapter])
    }

    const saveHandler = () => {
        const publication = {
            title: 'no state',
            description: 'no state',
            genres: genres.map(genre => genre.id),
            tags,
            chapters,
            author: pageId
        }
        console.log(publication)
    }

    useEffect(() => {
        loadData()
    }, [loadData])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    useEffect(() => {
        console.log(`genres ${genres}`)
        genres.forEach(genre => {
            console.log(genre)
            }
        )
    }, [genres])

    useEffect(() => {
        console.log(`tags ${tags}`)
        tags.forEach(tag => {
                console.log(tag)
            }
        )
    }, [tags])

    if (loading) {
        return <Loader classes={['my-5']}/>
    }

    return (
        <>{!loading && meta &&
        <div className={`row mt-3 ${c.textClass}`}>
            <div className="col-md-3 sidebar-3">
                {chapters.length > 0 &&
                <Contents chapters={chapters}/>
                }
            </div>
            <div className="col-md-9 ms-auto">
                <h2>{t('create.title')}</h2>
                <form className={`mb-3 ${c.formClass}`}>
                    <div className="mb-3">
                        <label htmlFor="publicationTitle" className="form-label">{t('title')}</label>
                        <input type="text"
                               className={c.inputClass}
                               id="publicationTitle"
                               placeholder={t('title.placeholder')}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="publicationDescription" className="form-label">{t('summary')}</label>
                        <textarea className={c.inputClass} id="publicationDescription" rows="3"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputGenres" className="form-label">{t('genres')}</label>
                        <SelectGenres genres={meta.genres} callback={setGenres}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputTags" className="form-label">{t('tags')}</label>
                        <SelectTags tags={meta.tags} callback={setTags}/>
                    </div>
                </form>

                {chapters.map(chapter =>
                    <ChapterCreate
                        key={chapter.id}
                        index={chapters.indexOf(chapter)}
                        chapter={chapter}
                        changeHandeler={changeChapter}
                        removeHandler={removeChapter}
                    />
                )}

                <div className="d-flex justify-content-between my-3">
                    <button
                        className={c.btnClass}
                        onClick={addChapterHandler}
                    >{t('chapter.add')}</button>
                    <button
                        className={c.btnClass}
                        onClick={saveHandler}
                    >{t('create-page.save')}</button>
                </div>
            </div>
        </div>
        }</>
    )
}