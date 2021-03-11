import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'

export const SelectActions = ({row}) => {
    const { c } = useThemedClasses()
    const { t } = useTranslation()


    return (
        <div className="btn-group">
            <button className={`btn-sm dropdown-toggle ${c.btnClass}`} type="button" data-bs-toggle="dropdown"
                    aria-expanded="false" id="dropdownActions">
                {t('table-users-actions.open')}
            </button>
            <ul className={c.dropdownClass} aria-labelledby="dropdownActions">
                <li><button type="button" className="dropdown-item">{t('table-users-actions.admin')}</button></li>
                <li><button type="button" className="dropdown-item">{t('table-users-actions.user')}</button></li>
                <li><button type="button" className="dropdown-item">{t('table-users-actions.block')}</button></li>
                <hr className="dropdown-divider"/>
                <li><button type="button" className="dropdown-item">{t('table-users-actions.delete')}</button></li>
            </ul>
        </div>
    )
}