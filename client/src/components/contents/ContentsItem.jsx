import React, { useRef } from 'react'
import { useSettingsDnD } from '../../hooks/settinsDnD.hook'


export const ContentsItem = ({ chapter, moveChapter, id, index }) => {
    const ref = useRef(null)
    const { handlerId, isDragging } = useSettingsDnD('content', ref, id, index, moveChapter)

    return(
        <a className={`nav-link draggable ${isDragging ? 'fade' : ''}`}
           aria-current="page"
           href={`#chapter${index}`}
           ref={ref}
           data-handler-id={handlerId}
        >{`${index + 1}. ${chapter.title}`}</a>
    )
}