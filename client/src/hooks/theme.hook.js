import { useState, useCallback, useEffect } from 'react'

export const useTheme = () => {
    const [theme, setTheme] = useState('')

    const toggleTheme = useCallback((th) => {
        setTheme(th)
        localStorage.setItem('theme', JSON.stringify(th))

    }, [])

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('theme'))
        if (!local) {
            if (window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches) {
                toggleTheme('dark')
            } else { toggleTheme('light') }
        }
        else { setTheme(local) }
    }, [toggleTheme])

    return { theme, toggleTheme }
}