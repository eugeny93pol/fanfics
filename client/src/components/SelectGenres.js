import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next'

export const SelectGenres = (props) => {
    const [options, setOptions] = useState([])
    const { t } = useTranslation()

    useEffect(() => {
        setOptions(
            props.genres.map(genre => {
                return { value: genre._id, label: genre.nameEN }
            })
        )
    }, [props.genres, setOptions])

    const changeHandler = (selected) => {
        const genres = selected.map(item => {return { genreId: item.value }})
        props.callback(genres)
    }

    return (
        <Select
            closeMenuOnSelect={ false }
            inputId="inputGenres"
            isClearable={ false }
            isMulti
            maxMenuHeight={ 170 }
            menuPlacement="auto"
            noOptionsMessage={ () => t('genres.no') }
            onChange={ changeHandler }
            options={ options }
            placeholder={t('genres.select')}
        />
    );
}