import { createContext } from 'react'

export const AuthContext = createContext({
    token: null,
    refreshToken: null,
    userData: null,
    isAuth: false,
    login: () => {},
    logout: () => {},
    getToken: () => {}
})