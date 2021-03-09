import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SelectGenres } from '../components/SelectGenres'
import { SelectTags } from '../components/SelectTags'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { ChapterCreate } from '../components/ChapterCreate'
import { nanoid } from 'nanoid'
import { Contents } from '../components/Contents'
import { useThemedClasses } from '../classnames/ThemedClasses'

export const CreatePage = () => {
    const [chapters, setChapters] = useState([])
    const [genres, setGenres] = useState([])
    const [tags, setTags] = useState([])
    const [meta, setMeta] = useState({ genres: [], tags: [] })


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

    const changeChapter = (chapter) => {
        setChapters(chapters.map(
            chp => chp.id === chapter.id ? {...chp, title: chapter.title, text: chapter.text} : chp
        ))
    }

    const removeChapter = (id) => {
        setChapters(chapters.filter(chp => chp.id !== id))
    }

    const addChapterHandler = () => {
        const chapter = {
            title: '',
            text: '',
            id: nanoid(5)
        }
        setChapters([...chapters, chapter])
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

    return (
            <div className={`row mt-3 ${ c.textClass }`}>
                <div className="col-md-3 sidebar-3">
                    { chapters.length > 0 &&
                    <Contents chapters={ chapters }/>
                    }
                </div>
                <div className="col-md-9 ms-auto">
                    <h2>{t('create.title')}</h2>
                    <form className={`mb-3 ${ c.formClass }`}>
                        <div className="mb-3">
                            <label htmlFor="publicationTitle" className="form-label">{t('title')}</label>
                            <input type="text"
                                   className={ c.inputClass }
                                   id="publicationTitle"
                                   placeholder={t('title.placeholder')}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="publicationDescription" className="form-label">{t('summary')}</label>
                            <textarea className={ c.inputClass } id="publicationDescription" rows="3"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputGenres" className="form-label">{t('genres')}</label>
                            <SelectGenres genres={ meta.genres } callback={ setGenres }/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputTags" className="form-label">{t('tags')}</label>
                            <SelectTags tags={ meta.tags } callback={ setTags } />
                        </div>
                    </form>

                    { chapters.map(chapter =>
                        <ChapterCreate
                            key={ chapter.id}
                            index={ chapters.indexOf(chapter) }
                            chapter={ chapter}
                            changeHandeler={ changeChapter }
                            removeHandler={ removeChapter }
                        />
                    )}

                    <div className="d-flex justify-content-center my-3">
                        <button
                            className={ c.btnClass }
                            onClick={ addChapterHandler }
                        >{t('chapter.add')}</button>
                    </div>
                </div>
            </div>
    )
}