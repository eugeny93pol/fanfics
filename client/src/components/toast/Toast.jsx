import React, { useEffect, useState } from 'react'
import Portal from '../portal/Portal'
import { useThemedClasses } from '../../classnames/ThemedClasses'

export const Toast = ({ message, isOpen, onCancel }) => {
    const { c } = useThemedClasses()
    const [show, setShow] = useState('')
    const [timerId, setTimerId] = useState(null)

    const closeHandler = () => {
        clearTimeout(timerId)
        setShow('')
        setTimeout(() => {
            setTimerId(null)
            onCancel()
        }, 500)
    }

    useEffect(() => {
        if (isOpen) {
            setShow('showing')
            setTimeout(() => {
                setShow('show')
            }, 100)
            const timer = setTimeout(()=> {
                closeHandler()
            }, 10000)
            setTimerId(timer)
        }
    },[isOpen])

    useEffect(() => {
        return () => {
            setTimerId(null)
            onCancel()
        }
    },[])

    return (
        <>{ isOpen &&
        <Portal className="modal-open">
            <div className="position-fixed bottom-0 end-0 p-3">
                <div id="toast" className={`${c.toastClass} ${show}`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            {message}
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={closeHandler}
                                aria-label="Close"/>
                    </div>
                </div>
            </div>
        </Portal>
        }</>
    )
}