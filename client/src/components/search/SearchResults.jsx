import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { SearchItem } from './SearchItem'
import '../navbar/index.css'
import { Link } from 'react-router-dom'


export const SearchResults = ({ results, cbCloseModal }) => {
    const [props, setProps] = useState(results)
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    useEffect(() => {
        setProps(results)
    }, [results])

    return (
        <> { props && props.hits && !!props.hits.length &&
        <div className={c.searchResultsClass}>
            <ul className="list-group list-group-flush">
                <li className={`${c.searchResultClass} user-select-none text-muted border-0`}>
                    <span>{t('search-results.count',{ count: props.nbHits })}</span>
                </li>
                { props.hits.map(hit => (
                    <li key={hit.objectID}>
                        <Link  to={`/publication/${hit.objectID}`}
                               className={c.searchResultClass}
                               onClick={cbCloseModal}
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