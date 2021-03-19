import React, { useEffect, useState } from 'react'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'
import { SelectGenres } from '../select/SelectGenres'
import { SelectTags } from '../select/SelectTags'
import './index.css'

export const PublicationHeadCreate = ({meta, setPublicationHead, initial}) => {
    const [publication, setPublication] = useState({
        title: initial.title,
        description:  initial.description,
        genres: initial.genres,
        tags:  initial.tags
    })

    const { c } = useThemedClasses()
    const { t } = useTranslation()

    const changeHandler = (event) => {
        setPublication({ ...publication, [event.target.name]: event.target.value })
    }

    const changeGenres = (selectGenres) => {
        setPublication({...publication, genres: selectGenres})
    }

    const changeTags = (selectTags) => {
        setPublication({...publication, tags: selectTags})
    }

    const submitHandler = () => {
        setPublicationHead(publication)
    }

    useEffect(() => {
        setPublicationHead(publication)
    }, [publication])

    return (
        <section className="publicationHead" id="publicationHead">
            <h2>{t('create-page.title')}</h2>
            <form className={`mb-3 ${c.formClass}`} onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="publicationTitle" className="form-label">{t('create-page-label.title')}</label>
                    <input type="text"
                           className={c.inputClass}
                           id="publicationTitle"
                           placeholder={t('create-page-placeholder.title')}
                           name="title"
                           value={publication.title}
                           onChange={changeHandler}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="publicationDescription" className="form-label">{t('create-page-label.summary')}</label>
                    <textarea
                        className={c.inputClass}
                        id="publicationDescription"
                        rows="3"
                        placeholder={t('create-page-placeholder.summary')}
                        name="description"
                        value={publication.description}
                        onChange={changeHandler}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputGenres" className="form-label">{t('create-page-label.genres')}</label>
                    <SelectGenres genres={meta.genres} callback={changeGenres} initial={publication.genres}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputTags" className="form-label">{t('create-page-label.tags')}</label>
                    <SelectTags tags={meta.tags} callback={changeTags} initial={publication.tags}/>
                </div>
            </form>
        </section>
    )
}