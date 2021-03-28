import React from 'react'

export const Loader = (props) => {
    const classes = ['spinner-border', 'text-info']
    if (props.classes) {
        classes.push(...props.classes)
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{padding: '3px 0'}}>
            <div className={ classes.join(' ') } role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}