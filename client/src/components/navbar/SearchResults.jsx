import React  from 'react'
import { connectHits } from 'react-instantsearch-dom'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { SearchItem } from './SearchItem'
import './index.css'
import { Link } from 'react-router-dom'


const Hits = (props) => {
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    return (
        <> { !!props.hits.length &&
        <div className={c.searchResultsClass}>
            <ul className="list-group list-group-flush">
                <li className={`${c.searchResultClass} user-select-none text-muted border-0`}>
                    <span>{t('search-results.count',{ count: props.hits.length})}</span>
                </li>
                { props.hits.map(hit => (
                    <li key={hit.objectID}>
                        <Link  to={`/publication/${hit.objectID}`}
                               className={c.searchResultClass}
                        >
                            <SearchItem hit={hit}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        }</>
    )
}

export const SearchResults = connectHits(Hits)