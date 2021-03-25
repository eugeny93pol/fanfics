import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { io } from 'socket.io-client'
import { CommentForm } from './CommentForm'
import { Comment } from './Comment'



export const CommentsModule = ({publication}) => {
    const [comments, setComments] = useState(publication.comments || [])

    const { t } = useTranslation()

    useEffect(() => {
        const socket = io()
        socket.on('comment', (comment) => {
            setComments(prev => prev.concat(comment))
        })
        socket.emit('subscribe', { _id: publication._id })
        return () => socket.disconnect()

    }, [])


    return(
        <>
            <h4 className="mb-3">{t('publication-page.comments-title')}</h4>
            <hr/>
            { comments.length ?
                comments.map(comment => <Comment key={comment._id} comment={comment}/>) :
                <p className="text-muted">{t('publication-page.comments-no-comments')}</p>
            }
            <CommentForm publicationId={publication._id}/>
        </>
    )
}