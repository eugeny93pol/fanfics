import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const classNames = require('classnames');

export const useThemedClasses = () => {
    const { theme } = useContext(ThemeContext)
    const [isDark, setIsDark] = useState(theme === 'dark')

    useEffect(() => {
        setIsDark(theme === 'dark')
    }, [theme])


    const btnClass = classNames({
        'btn': true,
        'btn-dark': !isDark,
        'btn-secondary': isDark
    })

    const btnCloseClass = classNames({
        'btn-close': true,
        'btn-close-white': isDark
    })

    const btnCloseAbsClass = classNames({
        'btn-close': true,
        'position-absolute': true,
        'top-0': true,
        'end-0': true,
        'm-2': true,
        'p-2': true,
        'rounded-circle': true
    })

    const btnOutlineClass = classNames({
        'btn': true,
        'btn-outline-dark': !isDark,
        'btn-outline-secondary': isDark
    })

    const btnSecClass = classNames({
        'btn': true,
        'btn-outline-secondary': !isDark,
        'btn-outline-light': isDark
    })

    const cardImage = classNames({
        'card': true,
        'mb-4': true,
        'bg-dark': isDark,
        'bg-light': !isDark,
        'text-white': true,
        'ratio': true,
        'ratio-4x3': true
    })

    const dropdownClass = classNames({
        'dropdown-menu': true,
        'shadow-sm': true,
        'bg-light': isDark
    })

    const dropzoneClass = classNames({
        'dropzone': true,
        'p-2': true,
        'form-control': true,
        'text-center': true,
        'border-secondary': isDark,
        'text-secondary': true,
        'bg-gray-dark': isDark
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

    const linkClass = classNames({
        'link-dark': !isDark,
        'link-info': isDark
    })

    const modalClass = classNames({
        "modal-content": true,
        "bg-dark": isDark,
        "bg-light": !isDark,
        "text-light": isDark,
        'shadow-sm': !isDark,
        'shadow': isDark,
    })

    const modalBackdropClass = classNames({
        "modal-backdrop": true,
        "show": true,
        "bg-gray-dark": isDark
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

    const contentsClass = classNames({
        'navbar-light': !isDark,
        'navbar-dark': isDark,
    })

    const publicationPreviewClass = classNames({
        'card': true,
        'mb-3': true,
        'border': true,
        'border-secondary': isDark,
        'text-light': isDark,
        'shadow-sm': !isDark,
        'shadow': isDark,
        'bg-body': !isDark,
        'bg-dark': isDark
    })

    const rateFullClass = classNames({
        'bi': true,
        'bi-star-fill': true,
        'text-info': isDark,
        'text-dark': !isDark
    })

    const selectClass = classNames({
        'form-select': true,
        'bg-gray-dark': isDark,
        'text-light': isDark,
        'border-secondary': isDark
    })

    const sidebarClass = classNames({
        'col-md-3': true,
        'sidebar-3': true,
        'navbar-light': !isDark,
        'navbar-dark': isDark
    })

    const tableClass = classNames({
        'table': true,
        'table-hover': true,
        'table-dark': isDark
    })

    const tableWrapperClass = classNames({
        'p-3': true,
        'rounded': true,
        'border': true,
        'table-responsive-md': true,
        'border-secondary': isDark,
        'shadow-sm': !isDark,
        'shadow': isDark,
        'bg-body': !isDark,
        'bg-dark': isDark
    })

    const textClass = classNames({
        'text-light': isDark
    })


    const c = {
        btnClass,
        btnCloseClass,
        btnCloseAbsClass,
        btnOutlineClass,
        btnSecClass,
        cardImage,
        contentsClass,
        dropdownClass,
        dropzoneClass,
        formClass,
        inputClass,
        inputInfoClass,
        linkClass,
        modalClass,
        modalBackdropClass,
        navbarClass,
        publicationPreviewClass,
        rateFullClass,
        selectClass,
        sidebarClass,
        tableClass,
        tableWrapperClass,
        textClass
    }
    return { c }
}