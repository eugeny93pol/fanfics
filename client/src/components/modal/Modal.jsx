import React from 'react'
import Portal from '../portal/Portal'
import { useTranslation } from 'react-i18next'
import { useThemedClasses } from '../../classnames/ThemedClasses'

export const Modal = ({ title, isOpen, onCancel, onSubmit, children }) => {
    const { t } = useTranslation()
    const { c } = useThemedClasses()

    return (
        <>{ isOpen &&
            <Portal className="modal-open">
                <div className="modal d-block"
                     aria-labelledby="modalTitle" aria-modal="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className={c.modalClass}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalTitle">{title}</h5>
                                <button type="button" className={c.btnCloseClass}
                                        aria-label={t('modal-dialog.close')}
                                        onClick={onCancel}/>
                            </div>
                            <div className="modal-body">
                                { children }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        onClick={onCancel}>{t('modal-dialog.cancel')}</button>
                                <button type="button" className="btn btn-danger"
                                        onClick={onSubmit}>{t('modal-dialog.submit')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            <div className={c.modalBackdropClass}/>
            </Portal>
        }</>
    )
}