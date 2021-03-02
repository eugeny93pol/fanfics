import {useState, useCallback, useEffect} from 'react'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, user) => {
        setToken(jwtToken)
        setUser(user)
        setIsAuth(true)
        localStorage.setItem('token', JSON.stringify(jwtToken))
        localStorage.setItem('user', JSON.stringify(user))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUser(null)
        setIsAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }, [])

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        const user = JSON.parse(localStorage.getItem('user'))
        if (token && user) {
            login(token, user)
        } else {
            logout()
        }
        setReady(true)
    }, [login, logout])

    return { login, logout, token, user, isAuth, ready }
}