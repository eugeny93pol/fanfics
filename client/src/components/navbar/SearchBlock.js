import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import './index.css'
import { ModalSearch } from '../modal/ModalSearch'

export const SearchBlock = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    const openSearchHandler = () => {
        setIsModalOpen(true)
    }

    const closeSearchHandler = () => {
        setIsModalOpen(false)
    }


    return (
        <div className="d-flex">
            <button className={c.btnSearchClass}
                    type="button"
                    onClick={ openSearchHandler }
                    aria-label="Search"
            ><i className="bi bi-search"/> {t('search')}</button>
            <ModalSearch isOpen={isModalOpen} onCancel={closeSearchHandler}/>
        </div>
    )
}