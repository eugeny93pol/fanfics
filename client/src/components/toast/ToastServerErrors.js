import React, { useEffect, useState } from 'react'
import { Toast } from './Toast'
import { useTranslation } from 'react-i18next'

export const ToastServerErrors = ({ error, cbClearError }) => {
    const [toastShow, setToastShow] = useState(false)
    const [message, setMessage] = useState('')
    const { t } = useTranslation()

    useEffect( () => {
        if (error) {
            try {
                setMessage(t(JSON.parse(error).message))
                setToastShow(true)
            } catch (e){}
        }
    }, [error, cbClearError])

    const cbCancel = () => {
        setToastShow(false)
        cbClearError()
    }

    return (
        <Toast message={message} isOpen={toastShow} onCancel={ cbCancel }/>
    )
}
