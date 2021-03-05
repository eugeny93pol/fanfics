import React from 'react'

export const VKButton = () => {
    const clickHandler = () => {
        console.log('click')
        const url = 'https://oauth.vk.com/authorize?client_id=7773119&display=popup&redirect_uri=http://localhost:3000/oauth/vk&scope=email&response_type=code'

        let params = `location=no`
        window.open(url,'auth',params)
    }

    return (
        <button
            className="btn btn-lg vk-btn social-btn"
            type="button"
            onClick={ clickHandler }
        />
    )
}