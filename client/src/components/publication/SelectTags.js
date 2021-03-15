import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { useTranslation } from 'react-i18next'


export const SelectTags = (props) => {
    const [options, setOptions] = useState([])
    const { t } = useTranslation()

    useEffect(() => {
        setOptions(
            props.tags.map(tag => {
                return { value: tag._id, label: tag.name }
            })
        )
    }, [props.tags, setOptions])


    const changeHandler = (selected) => {
        const tags = selected.map(item => {return { id: item.value, name: item.label }})
        props.callback(tags)
    }

    return (
        <CreatableSelect
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
            blurInputOnSelect={ false }
            className='multiselect'
            classNamePrefix={ 'select' }
        />
    );
}