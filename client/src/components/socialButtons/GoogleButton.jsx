import React from 'react'

export const GoogleButton = () => {
    const clickHandler = () => {
        window.open('https://mordor-fanfics.herokuapp.com/oauth/google', '_self')
    }

    return (
        <button
            className="btn btn-lg google-btn social-btn"
            type="button"
            onClick={ clickHandler }
        />
    )
}