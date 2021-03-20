import React, { useEffect, useState } from 'react'
import SimpleMDEReact from 'react-simplemde-editor'
import { EditorOptions } from './options'
import 'easymde/dist/easymde.min.css'
import './index.css'

// const regexp = /!\[[^\[\]]*?\]\(.*?\)/g

export const MarkdownEditor = ({setTextContent, value, image}) => {
    const [text, setText] = useState(value)

    const { options } = EditorOptions()

    const changeHandler = (value) => {
        setText(value)
    }

    useEffect(() => {
        setTextContent(text)
    }, [text])

    // useEffect(() => {
    //     if (image) {
    //         setText(prevState => prevState.replaceAll(regexp,'') +
    //             `\n![](${image.preview})\n`
    //         )
    //     } else {
    //         setText(prevState => prevState.replaceAll(regexp,''))
    //     }
    // },[image])

    return(
        <SimpleMDEReact
            value={ text }
            className="markdownEditor"
            onChange={ changeHandler }
            options={ options }
        />
    )
}