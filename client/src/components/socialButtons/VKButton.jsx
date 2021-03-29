import React from 'react'

export const VKButton = () => {
    const clickHandler = () => {
        window.open('https://mordor-fanfics.herokuapp.com/oauth/vk', '_self')
    }

    return (
        <button
            className="btn btn-lg vk-btn social-btn"
            type="button"
            onClick={ clickHandler }
        />
    )
}