import React from 'react'

export const SearchItem = ({ hit }) => {
    return (
        <>
            <h5 className="highlight"
                dangerouslySetInnerHTML={{
                    __html: hit._highlightResult.title.value
                }}/>
            <p className="highlight mb-1 text-muted"
                dangerouslySetInnerHTML={{
                    __html: hit._highlightResult.description.value
            }}/>
            <span className="hit-author">{hit.author}</span>
            {
                hit._highlightResult.title.matchLevel === 'none' &&
                hit._highlightResult.description.matchLevel === 'none'
                &&
                <span className="ms-2 text-muted">
                    <i className="bi bi-diagram-2"/>
                </span>
            }
        </>
    )
}