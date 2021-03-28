import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'

export const SortPanel = ({cbSetSort}) => {
    const [sort, setSort] = useState({
        field: '_id',
        order: 1
    })

    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const setFieldHandler = (event) => {
        const s = {...sort, field: event.target.value}
        setSort(s)
        cbSetSort(s)

    }
    const setOrderHandler = () => {
        const s = { ...sort, order: sort.order * -1 }
        setSort(s)
        cbSetSort(s)
    }


    return (
        <form className="d-flex gap-2" onChange={ setFieldHandler }>
            <button type="button"
                    name="order"
                    value={sort.order}
                    className={`${c.btnSortClass} ${sort.order ? 'active' : ''}`}
                    onClick={ setOrderHandler }
            >
                { sort.order !== -1 ? <i className="bi bi-sort-down-alt"/>
                    : <i className="bi bi-sort-down"/> }
            </button>

            <fieldset >
                <div className="btn-group">
                    <input type="radio" className="btn-check" name="field" value="title" id="by-title" autoComplete="off"/>
                    <label className={c.btnSortClass} htmlFor="by-title">
                        <span className=""><i className="bi bi-card-heading"/> </span>
                        <span className="d-none d-sm-inline">{t('sort-panel.title')}</span>
                    </label>

                    <input type="radio" className="btn-check" name="field" value="updated" id="by-date" autoComplete="off"/>
                    <label className={c.btnSortClass} htmlFor="by-date">
                        <span className=""><i className="bi bi-calendar2-day"/> </span>
                        <span className="d-none d-sm-inline">{t('sort-panel.date')}</span>
                    </label>

                    <input type="radio" className="btn-check" name="field" value="averageRating" id="by-rating" autoComplete="off"/>
                    <label className={c.btnSortClass} htmlFor="by-rating">
                        <span className=""><i className="bi bi-stars"/> </span>
                        <span className="d-none d-sm-inline">{t('sort-panel.rating')}</span>
                    </label>

                    <input type="radio" className="btn-check" name="field" value="comments" id="by-comments" autoComplete="off"/>
                    <label className={c.btnSortClass} htmlFor="by-comments">
                        <span className=""><i className="bi bi-chat-text"/> </span>
                        <span className="d-none d-sm-inline">{t('sort-panel.comments')}</span>
                    </label>
                </div>
            </fieldset>
        </form>
    )
}