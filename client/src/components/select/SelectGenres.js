import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next'

export const SelectGenres = ({ genres, callback, initial }) => {
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState([])
    const { t, i18n } = useTranslation()

    useEffect(() => {
        setOptions(
            genres.map(genre => ({ value: genre._id, label: genre.name[i18n.language] }))
        )
    }, [genres, setOptions, i18n.language])

    useEffect(() => {
        setSelected(options.filter(opt => ( initial.includes(opt.value))))
    },[options, initial])

    const changeHandler = (selected) => {
        setSelected(selected)
        callback(selected.map(item => item.value))
    }

    return (
        <Select
            closeMenuOnSelect={false}
            inputId="inputGenres"
            isClearable={false}
            isMulti
            maxMenuHeight={170}
            menuPlacement="auto"
            noOptionsMessage={() => t('create-page-placeholder.no-genres')}
            onChange={changeHandler}
            options={options}
            placeholder={t('create-page-placeholder.genres')}
            value={selected}
            className='multiselect'
            classNamePrefix={'select'}
        />
    )
}