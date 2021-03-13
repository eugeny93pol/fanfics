import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const Portal = ({ children, className = 'root-portal', el = 'div' }) => {
    const [container] = useState(document.createElement(el))
    const modalRoot = document.getElementById('root')

    container.classList.add(className)

    useEffect(() => {
        modalRoot.appendChild(container)
        return () => {
            modalRoot.removeChild(container)
        }
    }, [])

    return ReactDOM.createPortal(children, container)
}

export default Portal