import {useState, useCallback, useEffect} from 'react'

export const useTheme = () => {
    const [theme, setTheme] = useState(false)

    const toggleTheme = useCallback((th) => {
        setTheme(th)
        localStorage.setItem('theme', JSON.stringify(th))
    }, [])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('theme'))
        if (saved) {
            setTheme(saved)
        }
    }, [])

    return { theme, toggleTheme }
}