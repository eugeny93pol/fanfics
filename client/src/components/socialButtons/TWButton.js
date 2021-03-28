import React from 'react'

export const TWButton = () => {
    const clickHandler = () => {
        window.open('/oauth/twitter', '_self')
    }

    return (
        <button
            className="btn btn-lg tw-btn social-btn"
            type="button"
            onClick={ clickHandler }
        />

    )
}