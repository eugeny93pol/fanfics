import {useState, useCallback, useEffect} from 'react'

export const useLanguage = () => {
    const [language, setLanguage] = useState('en')

    const toggleLanguage = useCallback((lang) => {
        setLanguage(lang)
        localStorage.setItem('language', JSON.stringify(lang))
    }, [])

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('language'))
        saved && setLanguage(saved)
    }, [])

    return { language, toggleLanguage }
}