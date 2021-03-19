import React, { useCallback, useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { useTranslation } from 'react-i18next'

export const Dropzone = ({setSelectedFiles}) => {
    const [files, setFiles] = useState([])
    const { c } = useThemedClasses()
    const { t } = useTranslation()
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(
            file,
            { preview: URL.createObjectURL(file) }
        )))
    })

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

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    useEffect(() =>{
        setSelectedFiles(files)
    },[files])

    return (
        <div className="dropzone-wrapper">
            <div {...getRootProps({ className: c.dropzoneClass })}>
                <input {...getInputProps()} />
                {isDragAccept && (<div className="py-2 py-md-5"><span><i className="bi bi-image"/> {t('dropzone.accept')}</span></div>)}
                {isDragReject && (<div><span>{t('dropzone.reject')}</span></div>)}
                {!isDragActive && (<div><span>{t('dropzone.not-active')}</span></div>)}
            </div>
            <div className="thumbs-container mt-3">
                {
                    files.map(file => (
                        <div key={file.name} className="d-flex justify-content-center">
                            <div className="d-inline-block position-relative thumb-inner">
                                <img src={file.preview} alt={file.name}
                                     className="img-fluid rounded"/>
                                 <button
                                    className={ c.btnCloseAbsClass }
                                    aria-label={ t('dropzone.remove') }
                                    onClick={ removeImageHandler }
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}