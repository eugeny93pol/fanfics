import React from 'react'
import { IndeterminateCheckbox } from './IndeterminateCheckbox'
import { Link } from 'react-router-dom'
import { SelectColumnFilter } from './SelectColumnFilter'
import { useTranslation } from 'react-i18next'
import { SelectActions } from './SelectActions'

export const useTableSettings = () => {
    console.log('get settings')
    const { t } = useTranslation()
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
            Cell: e =><Link to={`/profile/${e.row.original._id}`}>{e.value}</Link>
        },
        {
            Header: t('table-header.email'),
            accessor: 'email',
            Cell: e =><a href={`mailto:${e.value}`}> { e.value } </a>
        },
        {
            Header: t('table-header.publications'),
            accessor: 'publications',
            Filter: ''
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
            Cell: e => <SelectActions row={e}/>,
            Filter: ''
        }
    ]

    return { columns }
}

