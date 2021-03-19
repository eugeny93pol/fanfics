import React from 'react'
import { useTranslation } from 'react-i18next'

export const Contents = ({chapters}) => {
    const { t } = useTranslation()
    return(
        <>
            <h4>{t('contents.title')}</h4>
            <nav className="nav navbar-nav flex-column" id="contents">
                { chapters.map((chapter, i) => (
                    <a className="nav-link" aria-current="page" key={ chapter._id }
                        href={`#chapter${i}`}>
                        {`${i + 1}. ${chapter.title}`}
                    </a>)
                )}
            </nav>
        </>
    )
}