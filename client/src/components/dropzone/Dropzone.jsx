import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { Loader } from '../loaders/Loader'

export const Dropzone = ({setSelectedFiles, initial}) => {
    const [files, setFiles] = useState(initial || [])
    const [uploading, setUploading] = useState(false)
    const { c } = useThemedClasses()
    const { t } = useTranslation()

    const { error, clearError, request } = useHttp()
    const { token } = useContext(AuthContext)

    const getSign = useCallback(async () => {
        setUploading(true)
        try {
            return await request(`/api/upload/`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {
            setUploading(false)
        }
    },[request, token])

    const uploadImages = useCallback(async (files, options) => {
        const formData = new FormData()
        const uploaded = []
        try {
            for (let i=0; i<files.length; i++) {
                formData.append('file', files[i])
                formData.append('api_key', options.api_key)
                formData.append('timestamp', options.timestamp)
                formData.append('signature', options.signature)

                const response = await fetch(options.url, {
                    method: "POST",
                    body: formData
                })
                const data = await response.json()
                uploaded.push(data.url)
            }
            setUploading(false)
            return uploaded
        } catch (e) {
            setUploading(false)
        }
    },[])

    const onDrop = useCallback(async acceptedFiles => {
        const options = await getSign()
        const uploaded = await uploadImages(acceptedFiles, options)
        setFiles(uploaded)
    }, [token, request, getSign, uploadImages])

    const options = {
        onDrop,
        accept: 'image/jpeg, image/png',
        maxFiles: 1,
        multiple: false
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone(options)

    const removeImageHandler = () => {
        setFiles([])
    }

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    useEffect(() => {
        setSelectedFiles(files)
    }, [files])

    return (
        <div className="dropzone-wrapper">
            <div {...getRootProps({ className: c.dropzoneClass })}>
                <input {...getInputProps()} />
                {isDragAccept && (<div className="py-2 py-md-5"><span><i className="bi bi-image"/> {t('dropzone.accept')}</span></div>)}
                {isDragReject && (<div><span>{t('dropzone.reject')}</span></div>)}
                {!isDragActive && (<div><span>{t('dropzone.not-active')}</span></div>)}
            </div>
            <div className="thumbs-container mt-3">
                { uploading && <Loader/>}
                {
                    files.map(file => (
                        <div key={file} className="d-flex justify-content-center position-relative thumb-inner">
                            <div className="ratio ratio-16x9">
                                <img src={file} alt={file} className="img-fluid rounded mx-auto"/>
                            </div>
                            <button
                                className={ c.btnCloseAbsClass }
                                aria-label={ t('dropzone.remove') }
                                onClick={ removeImageHandler }
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}