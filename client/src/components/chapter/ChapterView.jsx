import React, { useCallback, useContext, useState } from 'react'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { ToastServerErrors } from '../toast/ToastServerErrors'
import { ChapterMenu } from './ChapterMenu'


export const ChapterView = ({data, index, hasAccess}) => {
    const [chapter, setChapter] = useState(data)
    const { c } = useThemedClasses()
    const { t } = useTranslation()
    const { isAuth, userData, getToken } = useContext(AuthContext)
    const { error, clearError, request } = useHttp()

    const likeHandler = useCallback(async () => {
        try {
            const fetched = await request(`/api/chapters/like`, 'PATCH', {
                id: chapter._id,
                user: userData.id
            },{
                Authorization: getToken()
            })
            setChapter(fetched.chapter)
        } catch (e) {}
    },[request, getToken, userData, chapter])

    const deleteHandler = useCallback(() => {
        setChapter(null)
    }, [chapter])


    return (
        <>{ chapter &&
        <section className={`${c.textClass} position-relative anchorScroll mb-4`} id={`chapter${index}`}>
            {hasAccess &&
                <ChapterMenu chapter={chapter} cbDelete={deleteHandler}/>
            }
            {chapter.files.length ?
                <div className={c.cardImage}>
                    <img src={chapter.files[0]} className="card-img" alt={chapter.title}/>
                    <div className="card-img-overlay user-select-none">
                        <h5 className="card-title">{t('read-page-chapter.title', { number: index + 1 })}</h5>
                        <h3 className="card-title">{chapter.title}</h3>
                        <p className="card-text">{new Date(chapter.updated).toLocaleDateString()}</p>
                    </div>
                </div> : ''
            }
            {!chapter.files.length ?
                <>
                    <h5 className="text-muted">{t('read-page-chapter.title', { number: index + 1 })}</h5>
                    <h3>{chapter.title}</h3>
                    <p className="card-text text-muted">{new Date(chapter.updated).toLocaleDateString()}</p>
                </> : ''
            }

            <ReactMarkdown>
                {chapter.content}
            </ReactMarkdown>
            {isAuth &&
            <div className="d-flex gap-2">
                <div className="btn likeBtn" onClick={likeHandler} role="button">
                    <i className={`bi bi-heart${
                        chapter.likes.includes(userData.id) ? '-fill' : ''
                    }`}/>
                </div>
                <div>{chapter.likes.length}</div>
            </div>
            }
            <ToastServerErrors error={error} cbClearError={clearError}/>
        </section>
        }</>
    )
}