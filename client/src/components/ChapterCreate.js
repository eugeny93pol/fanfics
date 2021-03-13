import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { Modal } from './modal/Modal'

export const ChapterCreate = (props) => {
    const [chapter, setChapter] = useState(props.chapter)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const changeHandler = (event) => {
        setChapter({...chapter, [event.target.name]: event.target.value})
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.changeHandeler(chapter)
    }

    const blurHandler = () => {
        props.changeHandeler(chapter)
    }

    const removeHandler = () => {
        if (chapter.title || chapter.content){
            setIsModalOpen(true)
        } else {
            props.removeHandler(chapter.id)
        }
    }

    const submitModalHandler = () => {
        setIsModalOpen(false)
        props.removeHandler(chapter.id)
    }

    const cancelModalHandler = () => {
        setIsModalOpen(false)
    }

    return(
        <div id={`chapter${ props.index }`}>
            <h3>{`${ t('chapter') } ${ props.index + 1 }`}</h3>
            <form className={`mb-3 ${ c.formClass }`} onSubmit={ submitHandler }>
                <div className="mb-3">
                    <label htmlFor={`title-${ chapter.id }`} className="form-label">{ t('title') }</label>
                    <input type="text"
                           className={ c.inputClass }
                           id={`title-${ chapter.id }`}
                           placeholder={ t('chapter.placeholder') }
                           onChange={ changeHandler }
                           onBlur={ blurHandler }
                           name="title"
                           value={ chapter.title }
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor={`content-${chapter.id}`} className="form-label">{t('summary')}</label>
                    <textarea
                        className={ c.inputClass }
                        id={`content-${chapter.id}`}
                        onChange={ changeHandler }
                        onBlur={ blurHandler }
                        name="content"
                        value={ chapter.content }
                        rows="3"/>
                </div>
                <button type="button"
                        className="btn btn-danger"
                        onClick={ removeHandler }
                ><i className="bi bi-trash"/></button>
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