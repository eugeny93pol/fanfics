import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Loader } from '../loaders/Loader'
import { ToastServerErrors } from '../toast/ToastServerErrors'

export const CommentForm = ({publicationId}) => {
    const [text, setText] = useState('')
    const { c } = useThemedClasses()
    const { t } = useTranslation()
    const { loading, error, clearError, request } = useHttp()
    const { token } = useContext(AuthContext)

    const changeHandler = (event) => {
        setText(event.target.value)
    }

    const sendCommentHandler = useCallback(async (event) => {
        event.preventDefault()
        try {
            await request(`/api/comments/`, 'POST', {
                publication: publicationId,
                comment: text
            }, {
                Authorization: `Bearer ${token}`
            })
            setText('')
        } catch (e) {}
    }, [text, request, token, publicationId])


    return(
        <>
            <form className={`mb-3 ${c.formClass}`} onSubmit={sendCommentHandler}>
                <div className="mb-3">
                    <label htmlFor="inputComment" className="form-label">{
                        t('publication-page.comments-input-label')
                    }</label>
                    <textarea
                        className={c.inputClass}
                        id="inputComment"
                        placeholder={t('publication-page.comments-input-placeholder')}
                        name="comment"
                        value={text}
                        onChange={changeHandler}
                        rows="3"/>
                </div>
                <div className="text-end">
                    { !loading ?
                        <button type="submit" className={c.btnClass}
                        ><i className="bi bi-chat-text"/> {t('publication-page.comments-input-button')}</button>
                        :
                        <Loader/>
                    }
                </div>
            </form>
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </>
    )
}