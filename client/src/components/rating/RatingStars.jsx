import Rating from 'react-rating'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useThemedClasses } from '../../classnames/ThemedClasses'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useTranslation } from 'react-i18next'


export const RatingStars = ({ average, readonly, userRate, publicationId }) =>{
    const [rate, setRate] = useState(userRate ? userRate.value : average)
    const [averageRating, setAverageRating] = useState(average)
    const { c } = useThemedClasses()
    const { t } = useTranslation()
    const { userData, token } = useContext(AuthContext)
    const { error, clearError, request } = useHttp()

    const changeRateHandler = useCallback(async (rate) => {
        setRate(rate)
        try {
            const fetched = await request(`/api/publications/rate`, 'PATCH', {
                id: publicationId,
                user: userData.id,
                value: rate
            },{
                Authorization: `Bearer ${token}`
            })
            setRate(fetched.rate.value)
            setAverageRating(fetched.average)
        } catch (e) {}
    }, [token, request, userData, publicationId])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    return (
        <>
            <Rating
                placeholderRating={averageRating}
                emptySymbol="bi bi-star"
                fullSymbol={c.rateFullClass}
                placeholderSymbol={c.rateFullClass}
                onChange={ changeRateHandler }
                stop={5}
                initialRating={rate}
                readonly={readonly}
            />
            { averageRating>0 &&
                <div className="text-muted">{t('rating.average', { value: averageRating.toFixed(1) })}</div>
            }
        </>
    )
}