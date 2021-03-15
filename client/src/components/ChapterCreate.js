import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { Modal } from './modal/Modal'
import { Dropzone } from './dropzone/Dropzone'
import { MarkdownEditor } from './editor/MarkdownEditor'

export const ChapterCreate = (props) => {
    const [chapter, setChapter] = useState(props.chapter)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const changeHandler = (event) => {
        setChapter({ ...chapter, [event.target.name]: event.target.value })
    }

    const setContent = (content) => {
        setChapter({ ...chapter, content: content })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.changeHandler(chapter)
    }

    const removeHandler = () => {
        if (chapter.title || chapter.content || chapter.files.length){
            setIsModalOpen(true)
        } else {
            props.removeHandler(chapter.id)
        }
    }

    const setChapterFiles = (files) => {
        setChapter({...chapter, files})
    }

    const submitModalHandler = () => {
        setIsModalOpen(false)
        props.removeHandler(chapter.id)
    }

    const cancelModalHandler = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        props.changeHandler(chapter)
    }, [chapter])

    return(
        <div id={`chapter${ props.index }`}>
            <h3>{t('create-page-chapter.title', {number: props.index+1})}</h3>
            <form className={`mb-3 ${ c.formClass }`} onSubmit={ submitHandler }>
                <div className="mb-3">
                    <label htmlFor={`title-${ chapter.id }`} className="form-label">
                        { t('create-page-chapter-label.title') }
                    </label>
                    <input type="text"
                           className={ c.inputClass }
                           id={`title-${ chapter.id }`}
                           placeholder={ t('create-page-chapter-placeholder.title') }
                           onChange={ changeHandler }
                           name="title"
                           value={ chapter.title }
                    />
                </div>

                <div className="mb-3">
                    <MarkdownEditor setTextContent={ setContent } value={chapter.content}/>
                </div>

                <div className="mb-3">
                    <Dropzone setSelectedFiles={ setChapterFiles }/>
                </div>

                <button type="button" className="btn btn-danger" onClick={ removeHandler }>
                    <i className="bi bi-trash"/>
                </button>
            </form>
            <Modal title={t('create-page-modal.title')}
                   isOpen={ isModalOpen }
                   onCancel={ cancelModalHandler }
                   onSubmit={ submitModalHandler }
            >
                <p>{t('create-page-modal.text', {number: props.index+1})}</p>
            </Modal>
        </div>
    )
}