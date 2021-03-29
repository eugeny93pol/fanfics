import React from 'react'

export const VKButton = () => {
    const clickHandler = () => {
        window.open('/oauth/vk', '_self')
    }

    return (
        <button
            className="btn btn-lg vk-btn social-btn"
            type="button"
            onClick={ clickHandler }
        />
    )
}