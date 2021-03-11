import React, { useEffect, useState } from 'react'
import { useTable, useSortBy, useFilters, useRowSelect } from 'react-table'
import { DefaultColumnFilter } from './DefaultColumnFilter'
import { useThemedClasses } from '../../classnames/ThemedClasses'


export const TableUsers = ({ columns, data }) => {
    const defaultColumn = React.useMemo(() => ({ Filter: DefaultColumnFilter }), [])

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

    return(
        <table {...getTableProps()} className="table table-hover">
            <thead>
                <tr>{
                    headers.map(column =>(
                        <th {...column.getHeaderProps()} scope="col">
                            {column.canFilter &&
                                <div>{column.render('Filter')}</div>
                            }
                        </th>
                    ))
                }</tr>
                <tr>{
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
                    <tr {...row.getRowProps()}>
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