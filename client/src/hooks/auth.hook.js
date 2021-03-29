import jwt_decode from "jwt-decode"
import {useState, useCallback, useEffect} from 'react'
import { useHttp } from './http.hook'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [ready, setReady] = useState(false)
    const { request } = useHttp()

    const login = useCallback((jwtToken, jwtRefresh) => {
        const decoded = jwt_decode(jwtToken)
        const user = {
            id: decoded.userId,
            role: decoded.userRole
        }
        setToken(jwtToken)
        setRefreshToken(jwtRefresh)
        setUserData(user)
        setIsAuth(true)
        localStorage.setItem('token', JSON.stringify(jwtToken))
        localStorage.setItem('refresh', JSON.stringify(jwtRefresh))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setRefreshToken(null)
        setUserData(null)
        setIsAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
    }, [])

    const getToken = useCallback(async () => {
        const decoded = jwt_decode(token)
        const date = new Date()
        const expired = new Date(decoded.exp*1000)
        if (date >= expired){
            try {
                const data = await request('/api/auth/refresh', 'POST', { refreshToken })
                login(data.token, data.refreshToken)
                return `Bearer ${data.token}`
            } catch (e) { }
        }
        return `Bearer ${token}`
    }, [token, refreshToken])

    useEffect(() => {
        const savedToken = JSON.parse(localStorage.getItem('token'))
        const savedRefreshToken = JSON.parse(localStorage.getItem('setRefreshToken'))
        savedToken ? login(savedToken, savedRefreshToken) : logout()
        setReady(true)
    }, [login, logout])

    return { login, logout, getToken, userData, isAuth, ready }
}