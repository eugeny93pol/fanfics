import React from 'react'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'

export const LoaderCard = () => {

    const { c } = useThemedClasses()
    const { t } = useTranslation()

    return (
        <div className={c.publicationPreviewClass}>
            <div className="card-body text-muted user-select-none">
                <h4 className="card-title">{t('main-page-loader.title')}</h4>
                <p className="card-text">{t('main-page-loader.text')}</p>
                <div className="text-center my-4">
                    <div className="spinner-grow text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <div className="card-footer text-muted user-select-none">
                {t('site.description')}
            </div>
        </div>
    )
}