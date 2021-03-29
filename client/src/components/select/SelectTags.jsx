import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { useTranslation } from 'react-i18next'


export const SelectTags = ({ tags, callback, initial }) => {
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState([])
    const { t } = useTranslation()

    useEffect(() => {
        setOptions(tags.map(tag => ({ value: tag.name, label: tag.name, _id: tag._id })))
    }, [tags, setOptions])

    useEffect(() => {
        setSelected(options.filter(opt => ( initial.map(i=>i._id).includes(opt._id))))
    },[options])

    const changeHandler = (selected) => {
        setSelected(selected)
        const tags = selected.map(tag => ({ _id: tag._id || tag.label, name: tag.label }))
        callback(tags)
    }

    return (
        <CreatableSelect
            blurInputOnSelect={ false }
            closeMenuOnSelect={ true }
            formatCreateLabel={ (input) => `${t('create-page-label.create-tag')} "${input}"` }
            inputId="inputTags"
            isClearable={ false }
            isMulti
            maxMenuHeight={ 170 }
            menuPlacement="auto"
            noOptionsMessage={ () => t('create-page-placeholder.no-tags') }
            onChange={ changeHandler }
            options={ options }
            placeholder={t('create-page-placeholder.tags')}
            value={ selected }
            className='multiselect'
            classNamePrefix={ 'select' }
        />
    )
}