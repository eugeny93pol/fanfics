import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export const SelectGenres = (props) => {
    const [options, setOptions] = useState([])

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
            closeMenuOnSelect={false}
            inputId="inputGenres"
            isClearable={false}
            isMulti
            maxMenuHeight={170}
            menuPlacement="auto"
            onChange={ changeHandler }
            options={ options }
            placeholder="Select genres"
        />
    );
}