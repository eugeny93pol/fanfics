import React from 'react'
import { Link } from 'react-router-dom'

export const TagsList = ({tags}) => {
    return (
        <div className="d-flex gap-1">
            {tags.map(tag =>
                <Link to={`/tag/${tag._id}`} className="tag" key={tag._id}><i className="bi bi-tag"/> {tag.name}</Link>
            )}
        </div>
    )
}