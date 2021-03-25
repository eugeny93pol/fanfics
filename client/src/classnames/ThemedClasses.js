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

    const btnSearchClass = classNames({
        'bg-gray-dark': isDark,
        'border': true,
        'border-secondary': isDark,
        'btn': true,
        'searchBtnInput': true,
        'text-muted': isDark,
        'text-secondary': !isDark,
        'w-100': true
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

    const searchClearClass = classNames({
        'btn':true,
        'btn-lg': true,
        'text-light': isDark,
        'border-bottom-0': true,
        'border-top-0': true,
        'border-start-0': true,
        'border-secondary': isDark,
        'border': !isDark,
        'shadow-none': true,
        'rounded-0': true
    })

    const searchInputClass = classNames({
        'form-control': true,
        'form-control-lg': true,
        'border-0': true,
        'bg-gray-dark': isDark,
        'text-light': isDark,
        'shadow-none': true,
    })

    const searchInputWrapperClass = classNames({
        'modal-header': true,
        'p-0': true,
        'mb-1': true,
        'border': true,
        'rounded': true,
        'bg-body': !isDark,
        'bg-gray-dark': isDark,
        'border-light': !isDark,
        'border-secondary': isDark,
    })

    const searchLabelClass = classNames({
        'btn':true,
        'btn-lg': true,
        'border-0': true,
        'bg-body': !isDark,
        'shadow-none': true,
        'text-light': isDark
    })

    const searchModalCloseClass = classNames({
        'btn':true,
        'btn-close': true,
        'btn-close-white': isDark,
        'm-0': true,
        'ps-4': true,
        'shadow-none': true
    })

    const searchResultClass = classNames({
        'list-group-item':true,
        'border-top-0': true,
        'border-start-0': true,
        'border-end-0': true,
        'border-bottom': true,
        'border': isDark,
        'border-secondary': isDark,
        'text-light': isDark,
        'text-body': !isDark,
        'bg-gray-dark': isDark
    })

    const searchResultsClass = classNames({
        'modal-body':true,
        'p-0': true,
        'rounded': true,
        'border': isDark,
        'border-secondary': isDark,
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
        btnSearchClass,
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
        searchClearClass,
        searchInputClass,
        searchInputWrapperClass,
        searchLabelClass,
        searchModalCloseClass,
        searchResultClass,
        searchResultsClass,
        selectClass,
        sidebarClass,
        tableClass,
        tableWrapperClass,
        textClass
    }
    return { c }
}