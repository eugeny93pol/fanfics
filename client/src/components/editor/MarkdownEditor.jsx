import React, { useEffect, useState } from 'react'
import SimpleMDEReact from 'react-simplemde-editor'
import { EditorOptions } from './options'
import 'easymde/dist/easymde.min.css'
import './index.css'

export const MarkdownEditor = ({setTextContent, value}) => {
    const [text, setText] = useState(value)

    const { options } = EditorOptions()

    const changeHandler = (value) => {
        setText(value)
    }

    useEffect(() => {
        setTextContent(text)
    }, [text])

    return(
        <SimpleMDEReact
            value={ text }
            className="markdownEditor"
            onChange={ changeHandler }
            options={ options }
        />
    )
}