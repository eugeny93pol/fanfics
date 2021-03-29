import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { ToastServerErrors } from '../components/toast/ToastServerErrors'
import { useTranslation } from 'react-i18next'
import { MarkdownEditor } from '../components/editor/MarkdownEditor'
import { Dropzone } from '../components/dropzone/Dropzone'
import { Modal } from '../components/modal/Modal'
import { useThemedClasses } from '../classnames/ThemedClasses'


export const EditChapterPage = () => {
    const [chapter, setChapter] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { error, clearError, request } = useHttp()
    const { getToken } = useContext(AuthContext)
    const history = useHistory()
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const saveHandler = useCallback(async () => {
        try {
            const token = await getToken()
            const response = await request('/api/chapters/', 'PATCH', { ...chapter }, {
                Authorization: token
            })
            history.push(`/publication/${response.publication._id}`)
        } catch (e) {}
    }, [request, chapter])


    const removeChapter = useCallback(async () => {
        try {
            const token = await getToken()
            const response = await request('/api/chapters/', 'DELETE',
                { _id: chapter._id },
                { Authorization: token })
            history.push(`/publication/${response.publication._id}`)
        } catch (e) {}
    },[request, chapter])

    const changeTitle = (event) => {
        setChapter({...chapter, title: event.target.value} )
    }

    const changeContent = (content) => {

        setChapter({ ...chapter, content: content })
    }

    const changeFiles = (files) => {
        setChapter({...chapter, files})
    }

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

    useEffect(() => {
        if (history.location.state) {
            setChapter(history.location.state.chapter)
        } else {
            history.push('/')
        }
    },[])


    return (
        <>
            { chapter &&
            <section className={`position-relative chapter mt-3 ${c.textClass}`}>
                <div>
                    {chapter.title && <h3>{chapter.title}</h3> }
                    <form className={`mb-3 ${c.formClass}`} onSubmit={saveHandler}>
                        <div className="mb-3">
                            <label htmlFor={`title-${chapter._id}`} className="form-label">
                                {t('create-page-chapter-label.title')}
                            </label>
                            <input type="text"
                                   className={c.inputClass}
                                   id={`title-${chapter._id}`}
                                   placeholder={t('create-page-chapter-placeholder.title')}
                                   onChange={changeTitle}
                                   name="title"
                                   value={chapter.title}
                            />
                        </div>

                        <div className="mb-3">
                            <MarkdownEditor setTextContent={ changeContent } value={chapter.content}/>
                        </div>

                        <div className="mb-3">
                            <Dropzone setSelectedFiles={changeFiles} initial={chapter.files}/>
                        </div>

                        <button type="button" className="btn btn-danger" onClick={removeHandler}>
                            <i className="bi bi-trash"/>
                        </button>
                    </form>
                </div>
                <Modal title={t('publication-preview-modal.title')}
                       isOpen={isModalOpen}
                       onCancel={cancelModalHandler}
                       onSubmit={submitModalHandler}
                >
                    <p>{t('chapter-delete-modal.text', { title: chapter.title})}</p>
                </Modal>
            </section>
            }
            <div className="d-flex justify-content-end my-3">
                <button className="btn btn-info"
                        onClick={saveHandler}
                >
                    {t('chapter-edit-button.save')}
                </button>
            </div>
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </>
    )
}