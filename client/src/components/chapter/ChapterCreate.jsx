import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { Modal } from '../modal/Modal'
import { Dropzone } from '../dropzone/Dropzone'
import { MarkdownEditor } from '../editor/MarkdownEditor'
import { useSettingsDnD } from '../../hooks/settinsDnD.hook'


export const ChapterCreate = ({id, index, initial, moveChapter, changeChapter, removeChapter}) => {
    const [chapter, setChapter] = useState(initial)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { t } = useTranslation()
    const { c } = useThemedClasses()
    const ref = useRef(null)
    const { handlerId, isDragging } = useSettingsDnD('chapter', ref, id, index, moveChapter)

    const setContent = (content) => {
        setChapter({ ...chapter, content: content })
    }

    const setChapterFiles = (files) => {
        setChapter({...chapter, files})
    }

    const changeHandler = (event) => {
        setChapter({ ...chapter, [event.target.name]: event.target.value })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        changeChapter(chapter)
    }

    const removeHandler = () => {
        if (chapter.title || chapter.content || chapter.files.length){
            setIsModalOpen(true)
        } else {
            removeChapter(chapter._id)
        }
    }

    const submitModalHandler = () => {
        setIsModalOpen(false)
        removeChapter(chapter._id)
    }

    const cancelModalHandler = () => {
        setIsModalOpen(false)
    }

    const disableDrag = event => {
        event.preventDefault()
        event.stopPropagation()
    }

    useEffect(() => {
        changeChapter(chapter)
    }, [chapter])

    return(
        <>{ chapter &&
            <section
                id={`chapter${index}`}
                className={`position-relative chapter ${isDragging ? 'fade' : ''}`}
                ref={ref}
                data-handler-id={handlerId}
            >
                <div className="dragButton p-1 p-md-2">
                    <i className="bi bi-arrow-down-up"/>
                </div>
                <div onDragStart={ disableDrag } onTouchStartCapture={disableDrag} draggable>
                    <h3>{t('create-page-chapter.title', { number: index + 1 })}</h3>
                    <form className={`mb-3 ${c.formClass}`} onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor={`title-${chapter._id}`} className="form-label">
                                {t('create-page-chapter-label.title')}
                            </label>
                            <input type="text"
                                   className={c.inputClass}
                                   id={`title-${chapter._id}`}
                                   placeholder={t('create-page-chapter-placeholder.title')}
                                   onChange={changeHandler}
                                   name="title"
                                   value={chapter.title}

                            />
                        </div>

                        <div className="mb-3">
                            <MarkdownEditor setTextContent={setContent} value={chapter.content}/>
                        </div>

                        <div className="mb-3">
                            <Dropzone setSelectedFiles={setChapterFiles}/>
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
                    <p>{t('create-page-modal.text', { number: index + 1 })}</p>
                </Modal>
            </section>
        }</>
    )
}