import React, { useCallback, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Modal } from '../modal/Modal'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { ToastServerErrors } from '../toast/ToastServerErrors'

export const ChapterMenu = ({ chapter, cbDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { getToken } = useContext(AuthContext)
    const { error, clearError, request } = useHttp()
    const { t } = useTranslation()

    const removeChapter = useCallback(async () => {
        try {
            const token = await getToken()
            await request('/api/chapters/', 'DELETE',
                { _id: chapter._id },
                { Authorization: token })
            cbDelete()
        } catch (e) {}
    },[request, chapter, cbDelete])

    const removeHandler = () => {
        setIsModalOpen(true)
    }

    const submitModalHandler = () => {
        setIsModalOpen(false)
        removeChapter()
    }

    const cancelModalHandler = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <button className="btn chapterButton" type="button" data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${chapter._id}`}
                    aria-expanded="false" aria-controls="collapseMenu">
                <i className="bi bi-list"/>
            </button>
            <div className="collapse menu chapterMenu" id={`collapse-${chapter._id}`}>
                <div className="card card-body d-flex gap-2">
                    <Link className="btn btn-dark"
                          to={{
                              pathname: '/chapter',
                              state: { chapter }
                          }}
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
                <p>{t('chapter-delete-modal.text', { title: chapter.title})}</p>
            </Modal>
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </>
    )
}