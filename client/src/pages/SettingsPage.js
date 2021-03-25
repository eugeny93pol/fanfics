import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'
import { connectSearchBox } from 'react-instantsearch-dom'

const searchClient = algoliasearch(
    'TENFJKMODS',
    '1a471ff79d0baf729684de259db0dabf'
)



export const SettingsPage = () => {
    const { c } = useThemedClasses()
    const { t } = useTranslation()


    return (
        <div>
            <Hits hitComponent={Hit} />
        </div>
    )
}

function Hit(props) {
    return (
        <div>
            <div className="hit-title">
                <Highlight attribute="title" hit={props.hit} />
            </div>
            <div className="hit-description">
                <Highlight attribute="description" hit={props.hit} />
            </div>
            <div className="hit-price">{props.hit.author}</div>
            <div className="hit-description">

            </div>
        </div>
    );
}