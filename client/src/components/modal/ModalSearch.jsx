import React, { useCallback, useState } from 'react'
import Portal from '../portal/Portal'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { Helmet } from "react-helmet-async"
import { SearchInput } from '../search/SearchInput'
import { SearchResults } from '../search/SearchResults'

export const ModalSearch = ({ isOpen, onCancel }) => {
    const { c } = useThemedClasses()

    const [results, setResults] = useState([])

    const cbSetResults = useCallback((results) => {
        setResults(results)
    })

    return (
        <>{ isOpen &&
        <Portal className="modal-open">
            <div className="modal d-block" aria-labelledby="modalSearch" aria-modal="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content bg-transparent border-0">
                        <div className={c.searchInputWrapperClass}>
                            <SearchInput cbSetResults={cbSetResults}/>
                            <button
                                className={c.searchModalCloseClass}
                                onClick={onCancel}
                                type="button"
                            />
                        </div>
                        <SearchResults results={results} cbCloseModal={onCancel}/>
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