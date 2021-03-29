import React, { useCallback, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { ToastServerErrors } from '../toast/ToastServerErrors'

export const SelectActions = ({row, refresh}) => {
    const { c } = useThemedClasses()
    const { t } = useTranslation()
    const { userData } = useContext(AuthContext)
    const { getToken } = useContext(AuthContext)
    const { loading, error, clearError, request } = useHttp()

    const user = row.original

    const changeRole = useCallback(async (id, role) => {
        try {
            const token = await getToken()
            await request('/api/admin/update', 'PATCH',
                { usersIds: [id], role },
                { Authorization: token })
            refresh()
        } catch (e) {}
    },[request])

    const deleteUser = useCallback(async (id) => {
        try {
            const token = await getToken()
            await request('/api/admin/delete', 'DELETE',
                { usersIds: [id] },
                { Authorization: token })
            refresh()
        } catch (e) {}
    },[request])

    const changeHandler = async (e) => {
        const role = e.target.getAttribute('data-role')
        await changeRole(user._id, role)
    }

    const deleteHandler = async () => {
        await deleteUser(user._id)
    }


    return (
        <div className="btn-group">
            <button className={`btn-sm dropdown-toggle ${c.btnClass}`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false" id="dropdownActions"
                    disabled={ user._id === userData.id || loading }
            >
                {t('table-users-actions.open')}
            </button>
            <ul className={c.dropdownClass} aria-labelledby="dropdownActions">
                { user.role !== 'admin' &&
                <li>
                    <button type="button" className="dropdown-item"
                            data-role="admin"
                            onClick={ changeHandler }>
                        {t('table-users-actions.admin')}
                    </button>
                </li>
                }
                { user.role !== 'user' &&
                <li>
                    <button type="button" className="dropdown-item"
                            data-role="user"
                            onClick={ changeHandler }>
                        {t('table-users-actions.user')}
                    </button>
                </li>
                }
                { user.role !== 'blocked' &&
                <li>
                    <button type="button" className="dropdown-item"
                            data-role="blocked"
                            onClick={ changeHandler }>
                        {t('table-users-actions.block')}
                    </button>
                </li>
                }
                { user.role === 'blocked' &&
                <li>
                    <button type="button" className="dropdown-item"
                            data-role="user"
                            onClick={ changeHandler }>
                        {t('table-users-actions.unblock')}
                    </button>
                </li>
                }
                <hr className="dropdown-divider"/>
                <li>
                    <button type="button" className="dropdown-item"
                            data-role="delete"
                            onClick={ deleteHandler }>
                        {t('table-users-actions.delete')}
                    </button>
                </li>
            </ul>
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </div>
    )
}