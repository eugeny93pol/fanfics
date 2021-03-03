import React from 'react'

export const VKButton = () => {
    const clickHandler = () => {
        window.location.href = ''
    }

    return (
        <button
            className="btn btn-lg vk-btn social-btn"
            type="button"
            onClick={ clickHandler }
        />
    )
}