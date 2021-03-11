import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { TableUsers } from '../components/table/TableUsers'
import { useTableSettings } from '../components/table/TableSettings'


export const UsersPage = () => {

    const data = React.useMemo(
        () => [
            {
                _id: 'user_id',
                name: 'user_name',
                publications: ['id_pub1', 'id_pub2'],
                comments: ['id_comment1', 'id_comment2'],
                email: 'ex@mail.domain',
                role: 'user'
            }
        ],
        []
    )

    const [users, setUsers] = useState(null)
    const { loading, error, clearError, request } = useHttp()
    const { token } = useContext(AuthContext)
    const { t } = useTranslation()
    const { c } = useThemedClasses()
    const { columns } = useTableSettings()

    const loadData = useCallback(async () => {
        try {
            const fetchedUsers = await request('/api/admin/users/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsers(fetchedUsers.users)
        } catch (e) {}
    }, [token, request])

    const changeUserData = (userData) => {
        setUsers(userData)
    }

    useEffect(() => {
        loadData()
    },[loadData])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    if (loading) {
        return <Loader classes={['my-5']}/>
    }

    /**/

    /**/
    return (
        <>
        { !loading && users &&
            <div className="row mt-3">
                <div className="col">
                    <div className={c.formClass}>
                        <TableUsers columns={columns} data={data}/>
                    </div>
                </div>
            </div>
        }
        </>
    )
}