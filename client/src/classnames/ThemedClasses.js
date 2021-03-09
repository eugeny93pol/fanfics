import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const classNames = require('classnames');

export const useThemedClasses = () => {
    const [isDark, setIsDark] = useState()

    const { theme } = useContext(ThemeContext)


    const btnClass = classNames({
        btn: true,
        'btn-dark': !isDark,
        'btn-secondary': isDark
    })

    const btnOutlineClass = classNames({
        btn: true,
        'btn-outline-dark': !isDark,
        'btn-outline-secondary': isDark
    })

    const btnSecClass = classNames({
        btn: true,
        'btn-outline-secondary': !isDark,
        'btn-outline-light': isDark
    })

    const dropdownClass = classNames({
        'dropdown-menu': true,
        'shadow-sm': true,
        'bg-light': isDark
    })

    const formClass = classNames({
        'p-3': true,
        'rounded': true,
        'border': true,
        'border-secondary': isDark,
        'text-light': isDark,
        'shadow-sm': !isDark,
        'shadow': isDark,
        'bg-body': !isDark,
        'bg-dark': isDark
    })

    const inputClass = classNames({
        'form-control': true,
        'bg-gray-dark': isDark,
        'text-light': isDark,
        'border-secondary': isDark
    })

    const inputInfoClass = classNames({
        'form-control': true,
        'form-control-plaintext': true,
        'form-edit': true,
        'text-light': isDark,
        'bg-dark': isDark
    })

    const navbarClass = classNames({
        'navbar': true,
        'navbar-expand-lg': true,
        'border-bottom': true,
        'border-secondary': isDark,
        'fixed-top': true,
        'shadow-sm': !isDark,
        'shadow': isDark,
        'navbar-light': !isDark,
        'navbar-dark': isDark,
        'bg-body': !isDark,
        'bg-dark': isDark
    })

    const selectClass = classNames({

    })

    const sidebarClass = classNames({
        'navbar': true,
        'navbar-light': !isDark,
        'navbar-dark': isDark
    })

    const textClass = classNames({
        'text-light': isDark
    })


    const c = {
        btnClass,
        btnOutlineClass,
        btnSecClass,
        dropdownClass,
        formClass,
        inputClass,
        inputInfoClass,
        navbarClass,
        selectClass,
        sidebarClass,
        textClass
    }

    useEffect(() => {
        setIsDark(theme === 'dark')
    }, [theme])

    return { c }
}

