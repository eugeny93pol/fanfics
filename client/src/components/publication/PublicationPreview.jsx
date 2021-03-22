import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { PublicationMenu } from './PublicationMenu'
import Rating from 'react-rating'
import { GenresList } from '../genres/GenresList'
import { TagsList } from '../tags/TagsList'

export const PublicationPreview = ({publication, cbDelete}) => {
    const [hasAccess, setHasAccess] = useState(false)
    const { isAuth } = useContext(AuthContext)
    const { t } = useTranslation()
    const { c } = useThemedClasses()
    const { userData } = useContext(AuthContext)

    useEffect(() => {
        isAuth &&
        setHasAccess(userData.role === 'admin'
            || userData.id === publication.author._id)
    },[publication, userData])

    return (<>
        <div className={c.publicationPreviewClass}>
            <div className="card-body">
                {hasAccess &&
                    <PublicationMenu publication={publication} cbDelete={cbDelete}/>
                }
                <GenresList genres={publication.genres}/>
                <h5 className="card-title">{publication.title}</h5>
                <p className="card-text">{publication.description}</p>
                <div className="mb-3">
                    <TagsList tags={publication.tags}/>
                </div>
                <div className="text-end">
                    <Link to={`/publication/${publication._id}`} className={c.btnClass}
                    >{t('publication-preview.btn-read')}</Link>
                </div>
            </div>
            <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3 align-items-center">
                    <div className="d-none d-sm-block"><i className="bi bi-clock"/> {new Date(publication.updated).toLocaleDateString()}</div>
                    <div className="ratingWrapper">
                        <Rating
                            placeholderRating={publication.averageRating}
                            emptySymbol="bi bi-star"
                            placeholderSymbol={c.rateFullClass}
                            stop={5}
                            readonly
                        />
                    </div>
                    { publication.comments.length ?
                        <div className="user-select-none">
                            <span><i className="bi bi-chat-text"/> {publication.comments.length}</span>
                        </div> : ''
                    }
                </div>
                <div className="w-50 text-end">
                    <Link to={`/profile/${publication.author._id}`}
                          className={`nav-link link-secondary profileLink px-0 ${ !hasAccess && 'disabled'}`}
                    >{publication.author.name}</Link>
                </div>
            </div>
        </div>
    </>
    )
}