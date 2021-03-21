import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'


export const ChapterView = ({data, index, authorId, hasAccess}) => {
    const [chapter, setChapter] = useState(data)
    const { c } = useThemedClasses()
    const { t } = useTranslation()
    const { isAuth, userData, token } = useContext(AuthContext)
    const { loading, error, clearError, request } = useHttp()

    const likeHandler = useCallback(async () => {
        try {
            const fetched = await request(`/api/chapters/like`, 'PATCH', {
                id: chapter._id,
                user: userData.id
            },{
                Authorization: `Bearer ${token}`
            })
            setChapter(fetched.chapter)
        } catch (e) {}
    },[request, token, userData, chapter])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])


    return (
        <section className={`${c.textClass} chapter mb-4`} id={`chapter${index}`}>
            <h6 className="text-muted">{t('read-page-chapter.title', {number: index+1})}</h6>
            <h3>{chapter.title}</h3>
            <ReactMarkdown>
                {chapter.content}
            </ReactMarkdown>
            { chapter.files.length &&
                <div className="col-10 col-md-5 m-auto mt-4 text-center">
                    { chapter.files.map((file) =>
                        <img src={file} className="img-fluid rounded mb-3" alt={chapter.title} key={file}/>
                    )}
                </div>
            }
            { isAuth &&
                <div className="d-flex gap-2">
                    <div className="btn likeBtn" onClick={likeHandler} role="button">
                        <i className={`bi bi-heart${
                            chapter.likes.includes(userData.id) ? '-fill' : ''
                        }`}/>
                    </div>
                    <div>{chapter.likes.length}</div>
                </div>
            }
        </section>

    )
}