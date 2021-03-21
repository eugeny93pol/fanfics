import React from 'react'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { Link } from 'react-router-dom'

export const Comment = ({comment, hasAccess}) => {
    const { c } = useThemedClasses()

    return (
        <>
            <div className={c.publicationPreviewClass}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h6 className="card-title">
                            <Link to={`/profile/${comment.user._id}`}
                                  className={`nav-link link-secondary p-0 ${ !hasAccess ? 'disabled' : ''}`}>
                                <i className="bi bi-person-lines-fill"/> {comment.user.name}
                            </Link>
                        </h6>
                    </div>
                    <div className="rounded p-2 commentWrapper position-relative mt-2">
                        <p className="card-text mb-1">{comment.text}</p>
                        <span className="text-muted text-end d-block">{
                            new Date(comment.created).toLocaleString()
                        }</span>
                    </div>
                </div>
            </div>
        </>
    )
}