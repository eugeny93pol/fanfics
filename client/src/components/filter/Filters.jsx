import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { SortPanel } from './SortPanel'
import { useThemedClasses } from '../../classnames/ThemedClasses'

export const Filters = ({ publications, cbSetFiltered }) => {
    const [id, setId] = useState('')
    const [filtered, setFiltered] = useState([])
    const [sort, setSort] = useState(null)
    const [tags, setTags] = useState()
    const [genres, setGenres] = useState()
    const [filter, setFilter] = useState({
        title: '',
        tags: [],
        genres: []
    })

    const { t, i18n } = useTranslation()
    const { c } = useThemedClasses()
    const history = useHistory()

    const sortPublications = (publications, sort) => {
        if(sort) {
            const original = publications.slice()
            original.sort((a, b) => {
                let result
                if(sort.field === 'averageRating') {
                    result = (a-b)
                } else
                if(sort.field === 'comments') {
                    result = (a.comments.length-b.comments.length)
                } else
                if(sort.field === 'title') {
                    result = a.title.localeCompare(b.title)
                } else {
                    result = a.updated < b.updated ? -1 : 1
                }
                return result * sort.order
            })
            setFiltered(original)
            cbSetFiltered(original)
        } else {
            setFiltered(publications)
            cbSetFiltered(publications)
        }
    }

    const changeFilter = (filter) => {
        const result = publications.filter(pub => {
            let genres = pub.genres.filter(g => filter.genres.includes(g._id))
            let tags = pub.tags.filter(t => filter.tags.includes(t._id))
            return pub.title.toLowerCase().includes(filter.title.toLowerCase())
                && genres.length === filter.genres.length
                && tags.length === filter.tags.length
        })
        sortPublications(result, sort)
    }

    const changeSort = useCallback((sort) => {
        setSort(sort)
        sortPublications(filtered, sort)
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
        changeFilter(f)
    }

    const submitHandler = (event) => {
        event.preventDefault()
    }

    const sortNames = (a, b) => {
        return (typeof a[1]) === 'string' ?
            a[1].localeCompare(b[1]) :
            a[1][i18n.language].localeCompare(b[1][i18n.language])
    }

    useEffect(() => {
        const tagsMap = new Map()
        const genresMap = new Map()
        publications.forEach(pub => {
            pub.tags.forEach(tag => { tagsMap.set(tag._id, tag.name) })
            pub.genres.forEach(genre => { genresMap.set(genre._id, genre.name) })
        })
        setTags(tagsMap)
        setGenres(genresMap)
        setFiltered(publications)
    }, [publications])

    useEffect(() => {
        setId(queryString.parse(history.location.search).id)
    },[])

    return (
        <div className={c.formClass}>
            <div className="d-flex gap-2 justify-content-between">
                <button className={c.btnSortClass} type="button"
                        data-bs-toggle="collapse" data-bs-target="#filtersCollapse"
                        aria-expanded="false" aria-controls="filtersCollapse">
                    <i className="bi bi-funnel"/>
                </button>
                <SortPanel cbSetSort={ changeSort }/>
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
                    { genres && Array.from(genres).sort(sortNames).map(genre => (
                        <div className="form-check form-switch" key={genre[0]}>
                            <input className="form-check-input" type="checkbox"
                                   name="genres" id={genre[0]} value={genre[0]}
                                   defaultChecked={genre[0] === id}
                                   disabled={genre[0] === id}
                            />
                            <label className="form-check-label user-select-none"
                                   htmlFor={genre[0]}>{genre[1][i18n.language]}</label>
                        </div>
                    ))}
                    <h6 className="form-control-plaintext text-muted">{t('filters.tags')}</h6>
                    { tags && Array.from(tags).sort(sortNames).map(tag => (
                        <div className="form-check form-switch" key={tag[0]}>
                            <input className="form-check-input" type="checkbox"
                                   name="tags" id={tag[0]} value={tag[0]}
                                   defaultChecked={tag[0] === id}
                                   disabled={tag[0] === id}/>
                            <label className="form-check-label user-select-none"
                                   htmlFor={tag[0]}>{tag[1].toLowerCase()}</label>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}