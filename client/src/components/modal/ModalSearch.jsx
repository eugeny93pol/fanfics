import React from 'react'
import Portal from '../portal/Portal'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { Helmet } from "react-helmet-async"
import { SearchInput } from '../navbar/SearchInput'
import { SearchResults } from '../navbar/SearchResults'

export const ModalSearch = ({ isOpen, onCancel }) => {
    const { c } = useThemedClasses()

    return (
        <>{ isOpen &&
        <Portal className="modal-open">
            <div className="modal d-block" aria-labelledby="modalSearch" aria-modal="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content bg-transparent border-0">
                        <div className={c.searchInputWrapperClass}>
                            <SearchInput/>
                            <button
                                className={c.searchModalCloseClass}
                                onClick={onCancel}
                                type="button"
                            />
                        </div>
                        <SearchResults/>
                    </div>
                </div>
            </div>
            <div className={c.modalBackdropClass}/>
            <Helmet>
                <body style={"overflow: hidden"}/>
            </Helmet>
        </Portal>
        }</>
    )
}