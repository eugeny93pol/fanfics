import React from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'


export const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter }}) => {

    const { t } = useTranslation()
    const { c } = useThemedClasses()
    const count = preFilteredRows.length

    return (
        <input
            className={c.inputClass}
            value={filterValue || ''}
            onChange={e => { setFilter(e.target.value || undefined) }}
            placeholder={t('table-header.search', {count})}
        />
    )
}