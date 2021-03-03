import React from 'react'

export const TWButton = () => {
    const clickHandler = () => {
        window.open('https://oauth.vk.com/authorize?client_id=7773119&display=page&redirect_uri=http://localhost:3000/oauth/vk&scope=email&response_type=code')
    }
    return (
        <button
            className="btn btn-lg tw-btn social-btn"
            type="button"
            onClick={ clickHandler }
        />

    )
}