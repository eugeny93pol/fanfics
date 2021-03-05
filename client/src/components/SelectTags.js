import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'


const flavourOptions = [
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate'},
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'salted-caramel', label: 'Salted Caramel' },

];



export const SelectTags = (props) => {



    const changeHandler = (selected) => {
        console.log(selected)
    }

    return (
        <CreatableSelect
            closeMenuOnSelect={ true }
            inputId="inputTags"
            isClearable={ false }
            isMulti
            maxMenuHeight={ 170 }
            menuPlacement="auto"
            onChange={ changeHandler }
            options={ flavourOptions }
            placeholder="Select tags"


            //components={animatedComponents}
            //closeMenuOnScroll={true}
            //isLoading
            //loadingMessage
        />
    );
}