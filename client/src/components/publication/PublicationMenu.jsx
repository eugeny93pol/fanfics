import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Modal } from '../modal/Modal'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'

export const PublicationMenu = ({publication, cbDelete}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { token } = useContext(AuthContext)
    const { error, clearError, request } = useHttp()
    const { t } = useTranslation()

    const removePublication = useCallback(async () => {
        try {
            const response = await request('/api/publications/', 'DELETE',
                { _id: publication._id },
                { Authorization: `Bearer ${token}` })
            cbDelete(publication._id)
        } catch (e) {}
    },[request, token, publication])

    const removeHandler = () => {
        setIsModalOpen(true)
    }

    const submitModalHandler = () => {
        setIsModalOpen(false)
        removePublication()
    }

    const cancelModalHandler = () => {
        setIsModalOpen(false)
    }

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    return (
        <>
            <button className="btn menuButton" type="button" data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${publication._id}`}
                    aria-expanded="false" aria-controls="collapseMenu">
                <i className="bi bi-list"/>
            </button>
            <div className="collapse menu" id={`collapse-${publication._id}`}>
                <div className="card card-body d-flex gap-2">
                    <Link className="btn btn-dark"
                          to={`/edit/${publication._id}`}
                    ><i className="bi bi-pencil-square"/>{t('publication-preview.btn-edit')}</Link>
                    <button className="btn btn-dark" onClick={removeHandler}>
                        <i className="bi bi-trash"/>{t('publication-preview.btn-delete')}
                    </button>
                </div>
            </div>

            <Modal title={t('create-page-modal.title')}
                   isOpen={isModalOpen}
                   onCancel={cancelModalHandler}
                   onSubmit={submitModalHandler}
            >
                <p>{t('publication-preview-modal.text', { title: publication.title})}</p>
            </Modal>
        </>
    )
}