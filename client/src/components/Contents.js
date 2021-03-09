import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../classnames/ThemedClasses'

export const Contents = (props) => {
    const { t } = useTranslation()
    const { c } = useThemedClasses()
    return(
        <Fragment>
            <h4>{t('contents')}</h4>
            <nav className={ c.sidebarClass } id="contents">
                <ul className="navbar-nav">
                    { props.chapters.map(chapter => {
                        let index = props.chapters.indexOf(chapter)
                        return (
                            <li className="nav-item" key={ chapter.id }>
                                <a className="nav-link" aria-current="page"
                                   href={`#chapter${index}`}>
                                    {`${index + 1}. ${chapter.title}`}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </Fragment>
    )
}