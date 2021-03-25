import React from 'react'
import { Highlight } from 'react-instantsearch-dom'


export const SearchItem = ({ hit }) => {
    return (
        <>
            { console.log(hit) }
            <h5 className="card-title"><Highlight attribute="title" hit={hit} /></h5>
            <p className="hit-description">
                <Highlight attribute="description" hit={hit} />
            </p>
            <span className="hit-author">{hit.author}</span>
        </>
    );
}