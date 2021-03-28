import React from 'react'
import { useTranslation } from 'react-i18next'
import { VKButton } from './VKButton'
import { FBButton } from './FBButton'
import { YAButton } from './YAButton'
import { GoogleButton } from './GoogleButton'
import './index.css'

export const SocialButtons = () => {
    const { i18n, t } = useTranslation()
    return (
        <>
            <div className="mt-3 d-flex justify-content-center">
                <VKButton/>
                <FBButton/>
                <YAButton/>
                <GoogleButton/>
            </div>
            <div className="text-center mt-2">
                <a className="link-secondary" href={`/pages/${i18n.language}/privacy.html`}>{t('privacy-policy')}</a>
            </div>
        </>
    )
}