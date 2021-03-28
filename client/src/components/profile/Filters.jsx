import React, { useEffect, useState } from 'react'
import { SortPanel } from './SortPanel'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

export const Filters = ({publications, cbSetFilter, cbSetSort}) => {
    const { t } = useTranslation()
    const { c } = useThemedClasses()
    const [tags, setTags] = useState()
    const [genres, setGenres] = useState()
    const [filter, setFilter] = useState({
        title: '',
        tags: [],
        genres: []
    })

    const changeFiltersHandler = (event) => {
        const t = event.target
        let f
        if (t.name === 'title') {
            f = { ...filter, title: t.value }
        } else {
            if (t.checked) {
                f = { ...filter, [t.name]: filter[t.name].concat(t.value) }
            } else {
                f = { ...filter, [t.name]: filter[t.name].filter(v => v !== t.value) }
            }
        }
        setFilter(f)
        cbSetFilter(f)
    }

    const submitHandler = (event) => {
        event.preventDefault()
    }

    const cbSort = (a, b) => {
        return a[1].localeCompare(b[1])
    }

    useEffect(() => {
        const tagsMap = new Map()
        const genresMap = new Map()
        publications.forEach(pub => {
            pub.tags.forEach(tag => { tagsMap.set(tag._id, tag.name) })
            pub.genres.forEach(genre => { genresMap.set(genre._id, genre.name[i18next.language]) })
        })
        setTags(tagsMap)
        setGenres(genresMap)
    }, [publications])

    return (
        <div className={c.formClass}>
            <div className="d-flex gap-2 justify-content-between">
                <button className={c.btnSortClass} type="button"
                        data-bs-toggle="collapse" data-bs-target="#filtersCollapse"
                        aria-expanded="false" aria-controls="filtersCollapse">
                    <i className="bi bi-funnel"/>
                </button>
                <SortPanel cbSetSort={cbSetSort}/>
            </div>
            <div className="collapse mt-3" id="filtersCollapse">
                <form className={c.filterFormClass}
                      onChange={ changeFiltersHandler }
                      onSubmit={ submitHandler }>
                    <div className="input-group mb-3">
                        <label className={c.filterTitleLabelClass}
                               id="filter-title">{t('filters.title')}</label>
                        <input type="text" className={c.filterInputClass}
                               placeholder={t('filters.title-placeholder')} name="title"/>
                    </div>
                    <h6 className="form-control-plaintext text-muted">{t('filters.genres')}</h6>
                    { genres && Array.from(genres).sort(cbSort).map(genre => (
                        <div className="form-check form-switch" key={genre[0]}>
                            <input className="form-check-input" type="checkbox"
                                   name="genres" id={genre[0]} value={genre[0]}/>
                            <label className="form-check-label user-select-none"
                                   htmlFor={genre[0]}>{genre[1]}</label>
                        </div>
                    ))}
                    <h6 className="form-control-plaintext text-muted">{t('filters.tags')}</h6>
                    { tags && Array.from(tags).sort(cbSort).map(tag => (
                        <div className="form-check form-switch" key={tag[0]}>
                            <input className="form-check-input" type="checkbox"
                                   name="tags" id={tag[0]} value={tag[0]}/>
                            <label className="form-check-label user-select-none"
                                   htmlFor={tag[0]}>{tag[1].toLowerCase()}</label>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}