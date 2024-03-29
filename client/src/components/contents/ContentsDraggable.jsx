import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { isMobile } from 'react-device-detect'
import { ContentsItem } from './ContentsItem'


export const ContentsDraggable = ({ publication, moveChapter }) => {
    const { t } = useTranslation()
    const backend = useMemo(() => isMobile ? TouchBackend : HTML5Backend, [])

    return(
        <DndProvider backend={backend}>
            <h4>{t('contents.title')}</h4>
            <nav className="nav navbar-nav flex-column" id="contents">
                    { publication.chapters.map((chapter, i) => (
                            <ContentsItem
                                key={chapter._id}
                                id={chapter._id}
                                index={i}
                                chapter={chapter}
                                moveChapter={moveChapter}
                            />
                        )
                    )}
            </nav>
        </DndProvider>
    )
}