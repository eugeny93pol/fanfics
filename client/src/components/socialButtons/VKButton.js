import React from 'react'

export const VKButton = () => {
    const clickHandler = () => {
        window.open('http://localhost:5000/oauth/vk', '_self')
    }

    return (
        <button
            className="btn btn-lg vk-btn social-btn"
            type="button"
            onClick={ clickHandler }
        />
    )
}