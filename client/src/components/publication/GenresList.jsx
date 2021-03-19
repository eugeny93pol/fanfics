import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const GenresList = ({genres}) => {
    const { i18n } = useTranslation()
    return (
        <div className="breadcrumb">
            { genres.map(genre =>
                <Link key={genre._id}
                      to={`/genre/${genre._id}`}
                      className="breadcrumb-item link-secondary text-decoration-none"
                >{genre.name[i18n.language]}</Link>
            )}
        </div>
    )
}