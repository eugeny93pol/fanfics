import React from 'react'

export const FBButton = () => {
    const clickHandler =  () => {
        window.open('/oauth/facebook', '_self')
    }

    return (
        <button
            className="btn btn-lg fb-btn social-btn"
            type="button"
            onClick={clickHandler}
        />
    )
}