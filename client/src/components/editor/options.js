import EasyMDE from 'easymde'
import { useTranslation } from 'react-i18next'


export const EditorOptions = () => {
    const { t } = useTranslation()

    const options = {
        placeholder: t('create-page-chapter-placeholder.text'),
        uploadImage: false,
        status: false,
        toolbar: [{
            name: 'bold',
            action: EasyMDE.toggleBold,
            className: "fa fa-bold",
            title: t('editor-button.bold')
        },
            {
                name: 'italic',
                action: EasyMDE.toggleItalic,
                className: "fa fa-italic",
                title: t('editor-button.italic')
            },
            {
                name: 'strikethrough',
                action: EasyMDE.toggleStrikethrough,
                className: "fa fa-strikethrough",
                title: t('editor-button.strike')
            },
            '|',
            {
                name: 'heading-1',
                action: EasyMDE.toggleHeading1,
                className: "fa fa-header fa-heading",
                title: t('editor-button.heading-1')
            },
            {
                name: 'heading-2',
                action: EasyMDE.toggleHeading2,
                className: "fa fa-header fa-heading",
                title: t('editor-button.heading-2')
            },
            {
                name: 'heading-3',
                action: EasyMDE.toggleHeading3,
                className: "fa fa-header fa-heading",
                title: t('editor-button.heading-3')
            },
            '|',
            {
                name: 'quote',
                action: EasyMDE.toggleBlockquote,
                className: "fa fa-quote-left",
                title: t('editor-button.quote')
            },
            {
                name: 'unordered-list',
                action: EasyMDE.toggleUnorderedList,
                className: "fa fa-list-ul",
                title: t('editor-button.unordered-list')
            },
            {
                name: 'ordered-list',
                action: EasyMDE.toggleOrderedList,
                className: "fa fa-list-ol",
                title: t('editor-button.ordered-list')
            },
            '|',
            {
                name: 'preview',
                action: EasyMDE.togglePreview,
                className: "fa fa-eye no-disable",
                title: t('editor-button.preview')
            }
        ],
        shortcuts: {
            'drawLink': null,
            'toggleCodeBlock': null,
            'drawImage': null,
            'toggleSideBySide': null
        },
        spellChecker: false
    }
    return { options }
}

