import jwt_decode from "jwt-decode"
import {useState, useCallback, useEffect} from 'react'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken) => {
        const decoded = jwt_decode(jwtToken)
        const user = {
            id: decoded.userId,
            role: decoded.userRole
        }
        setToken(jwtToken)
        setUserData(user)
        setIsAuth(true)
        localStorage.setItem('token', JSON.stringify(jwtToken))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserData(null)
        setIsAuth(false)
        localStorage.removeItem('token')
    }, [])

    useEffect(() => {
        const savedToken = JSON.parse(localStorage.getItem('token'))
        savedToken ? login(savedToken) : logout()
        setReady(true)
    }, [login, logout])

    return { login, logout, token, userData, isAuth, ready }
}