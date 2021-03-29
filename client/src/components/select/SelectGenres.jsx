import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next'

export const SelectGenres = ({ genres, callback, initial }) => {
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState([])
    const { t, i18n } = useTranslation()

    useEffect(() => {
        setOptions(
            genres.map(genre => ({
                value: genre.name[i18n.language],
                label: genre.name[i18n.language],
                _id: genre._id
            }))
        )
    }, [genres, setOptions, i18n.language])

    useEffect(() => {
        setSelected(options.filter(opt => (initial.map(i=>i._id).includes(opt._id))))
    },[options, initial])

    const changeHandler = (selected) => {
        setSelected(selected)
        callback(selected.map(genre => ({_id: genre._id, name: genre.value})))
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