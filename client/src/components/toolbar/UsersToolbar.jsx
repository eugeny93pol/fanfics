import React, { useCallback, useContext } from 'react'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { ToastServerErrors } from '../toast/ToastServerErrors'

export const UsersToolbar = ({ids, update}) => {
    const { getToken } = useContext(AuthContext)
    const { loading, error, clearError, request } = useHttp()
    const { c } = useThemedClasses()
    const { t } = useTranslation()

    const changeHandler = async (e) => {
        const role = e.currentTarget.getAttribute('data-role')
        await changeRoles(ids, role)
    }

    const deleteHandler = async () => {
        await deleteUsers(ids)
    }

    const changeRoles = useCallback(async (usersIds, role) => {
        try {
            const token = await getToken()
            await request('/api/admin/update', 'PATCH',
                { usersIds, role },
                { Authorization: token })
            update()
        } catch (e) {}
    }, [request])

    const deleteUsers = useCallback(async (usersIds) => {
        try {
            const token = await getToken()
            await request('/api/admin/delete', 'DELETE',
                { usersIds },
                { Authorization: token })
            update()
        } catch (e) {}
    },[request])

    return (
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar">
            <div className="btn-group me-2" role="group" aria-label="Mange status group">
                <button type="button" className={c.btnClass}
                        data-role="blocked"
                        onClick={ changeHandler }
                        disabled={loading}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top" title="Tooltip on top"
                >
                    <i className="bi-lock"/>
                    <span className="visually-hidden">{t('table-users-actions.block')}</span>
                </button>
                <button type="button" className={c.btnClass}
                        data-role="user"
                        onClick={ changeHandler }
                        disabled={loading}
                >
                    <i className="bi-unlock"/>
                    <span className="visually-hidden">{t('table-users-actions.unblock')}</span>
                </button>
            </div>
            <div className="btn-group me-2" role="group" aria-label="Manage roles group">
                <button type="button" className={c.btnClass}
                        data-role="admin"
                        onClick={ changeHandler }
                        disabled={loading}
                >
                    <i className="bi-shield-shaded"/>
                    <span className="visually-hidden">{t('table-users-actions.admin')}</span>
                </button>
                <button type="button" className={c.btnClass}
                        data-role="user"
                        onClick={ changeHandler }
                        disabled={loading}
                >
                    <i className="bi-person"/>
                    <span className="visually-hidden">{t('table-users-actions.user')}</span>
                </button>
            </div>
            <div className="btn-group" role="group" aria-label="Delete group">
                <button type="button" className="btn btn-danger"
                        onClick={ deleteHandler }
                        disabled={loading}
                >
                    <i className="bi-trash"/>
                    <span className="visually-hidden">{t('table-users-actions.delete')}</span>
                </button>
            </div>
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </div>
    )
}