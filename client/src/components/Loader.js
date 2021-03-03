import React from 'react'

export const Loader = (props) => {

    const classes = ['spinner-border']

    if (props.classes) {
        classes.push(...props.classes)
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className={ classes.join(' ') } role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}