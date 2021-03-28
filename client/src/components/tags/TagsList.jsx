import React from 'react'
import { Link } from 'react-router-dom'

export const TagsList = ({tags}) => {
    return (
        <div className="d-flex flex-wrap gap-1">
            {tags.map(tag =>
                <Link
                    to={{
                        pathname: `/publications`,
                        search: `field=tags&id=${tag._id}`,
                        state: { name: tag.name }
                    }}
                    className="tag"
                    key={tag._id}><i className="bi bi-tag"
                /> {tag.name}</Link>
            )}
        </div>
    )
}