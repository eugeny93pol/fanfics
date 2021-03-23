import React, { useEffect } from 'react'
import { useTable, useSortBy, useFilters, useRowSelect } from 'react-table'
import { DefaultColumnFilter } from './DefaultColumnFilter'
import { useThemedClasses } from '../../classnames/ThemedClasses'


export const TableUsers = ({ columns, data, setSelectedRows }) => {
    const defaultColumn = React.useMemo(() => ({ Filter: DefaultColumnFilter }), [])

    const { c } = useThemedClasses()

    const {
        getTableProps,
        getTableBodyProps,
        headers,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds }
    } = useTable(
            {
                columns,
                data,
                defaultColumn
            },
            useFilters,
            useSortBy,
            useRowSelect
        )

    useEffect(() => {
        setSelectedRows(selectedFlatRows.map(row => row.original))
    }, [selectedRowIds])

    return(
        <table {...getTableProps()} className={c.tableClass}>
            <thead>
                <tr className="align-middle">
                    {
                    headers.map(column =>(
                        <th {...column.getHeaderProps()} scope="col">
                            {column.canFilter &&
                                column.render('Filter')
                            }
                        </th>
                    ))
                }</tr>
                <tr className="align-middle">{
                    headers.map(column =>(
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            { column.isSorted ?
                                column.isSortedDesc
                                    ? <i className="bi bi-caret-down-fill"/>
                                    : <i className="bi bi-caret-up-fill"/>
                            : '' }
                            { column.render('Header') }
                        </th>
                    ))
                }</tr>

            </thead>
            <tbody {...getTableBodyProps()}>
            { rows.map(row => {
                prepareRow(row)
                return (
                    <tr className="align-middle" {...row.getRowProps()}>
                        {
                            row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        { cell.render('Cell') }
                                    </td>
                                )
                            })
                        }
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}