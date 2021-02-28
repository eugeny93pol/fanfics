import {useState, useCallback, useEffect} from 'react'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

    const login = useCallback((jwtToken/*, id*/) => {
        setToken(jwtToken)
        setIsAuth(true)
        localStorage.setItem('token', JSON.stringify(jwtToken))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setIsAuth(false)
        localStorage.removeItem('token')
    }, [])

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            login(token)
        }
    }, [login])

    return { login, logout, token, isAuth }
}