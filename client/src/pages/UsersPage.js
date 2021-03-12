import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { TableUsers } from '../components/table/TableUsers'
import { useTableSettings } from '../components/table/TableSettings'
import { UsersToolbar } from '../components/toolbar/UsersToolbar'


export const UsersPage = () => {
    const [users, setUsers] = useState(null)
    const [selectedIds, setSelectedIds] = useState(null)
    const { loading, error, clearError, request } = useHttp()
    const { token, userData } = useContext(AuthContext)
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const loadData = useCallback(async () => {
        try {
            const fetchedUsers = await request('/api/admin/users', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsers(fetchedUsers.users)
        } catch (e) {}
    }, [token, request])

    const { columns } = useTableSettings(loadData)

    const setSelectedRows = useCallback((rows) => {
        rows && setSelectedIds(rows.map(row => row._id).filter(id => id !== userData.id))
    },[setSelectedIds])


    useEffect(() => {
        loadData()
    },[loadData])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    return (
         <>
            <div className="row mt-3">
                <div className="col d-flex justify-content-end">
                    <UsersToolbar ids={selectedIds} update={loadData}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div className={c.tableWrapperClass}>
                        {
                            users ?
                                <TableUsers columns={columns} data={users} setSelectedRows={setSelectedRows}/>
                            :
                                <Loader classes={['my-5']}/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}