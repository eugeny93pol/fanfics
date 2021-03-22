import {useState, useCallback, useEffect} from 'react'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, user) => {
        setToken(jwtToken)
        setUserData(user)
        setIsAuth(true)
        localStorage.setItem('token', JSON.stringify(jwtToken))
        localStorage.setItem('userData', JSON.stringify(user))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserData(null)
        setIsAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
    }, [])

    useEffect(() => {
        const tokenStored = JSON.parse(localStorage.getItem('token'))
        const userDataStored = JSON.parse(localStorage.getItem('userData'))
        tokenStored && userDataStored ? login(tokenStored, userDataStored) : logout()
        setReady(true)
    }, [login, logout])

    return { login, logout, token, userData, isAuth, ready }
}