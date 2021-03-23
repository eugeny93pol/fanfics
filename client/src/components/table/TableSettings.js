import React from 'react'
import { IndeterminateCheckbox } from './IndeterminateCheckbox'
import { Link } from 'react-router-dom'
import { SelectColumnFilter } from './SelectColumnFilter'
import { useTranslation } from 'react-i18next'
import { SelectActions } from './SelectActions'
import { useThemedClasses } from '../../classnames/ThemedClasses'

export const useTableSettings = (refreshTable) => {
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const columns = [
        {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            )
        },
        {
            Header: t('table-header.name'),
            accessor: 'name',
            Cell: e =><Link className={ c.linkClass } to={`/profile/${e.row.original._id}`}>{e.value}</Link>
        },
        {
            Header: t('table-header.email'),
            accessor: 'email',
            Cell: e =><a className={ c.linkClass } href={`mailto:${e.value}`}> { e.value } </a>
        },
        {
            Header: t('table-header.status'),
            accessor: 'role',
            Filter: SelectColumnFilter,
            filter: 'includes'
        },
        {
            Header: t('table-header.actions'),
            id: 'actions',
            accessor: 'role',
            Cell: e => <SelectActions row={ e.row } refresh={ refreshTable }/>,
            Filter: ''
        }
    ]

    return { columns }
}

