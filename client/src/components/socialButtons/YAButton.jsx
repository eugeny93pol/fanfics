import React from 'react'

export const YAButton = () => {
    const clickHandler = () => {
        window.open('http://localhost:5000/oauth/yandex', '_self')
    }

    return (
        <button
            className="btn btn-lg ya-btn social-btn"
            type="button"
            onClick={ clickHandler }
        />

    )
}