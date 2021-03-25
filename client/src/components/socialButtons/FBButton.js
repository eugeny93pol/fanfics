import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'

export const FBButton = () => {
    const {request} = useHttp()
    const clickHandler = useCallback(async () => {
        const response = await request('/api/auth/facebook')
        console.log(response)
    }, [request])

    return (
        <Link
            className="btn btn-lg fb-btn social-btn"
            type="button"
            to="/api/auth/facebook"
            onClick={clickHandler}
        />
    )
}