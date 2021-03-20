import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const colors = ['#31D4F2', '#49A4B5', '#10879D', '#64E1F9',
                '#8BE7F9', '#00AA72', '#207F60', '#006E4A',
                '#35D4A0', '#60D4AE', '#104BA9', '#284A7E',
                '#447BD4', '#6A93D4']

const calcRanges = (tags) => {
    const values = tags.map(tag => tag.popularity)
    values.sort((a, b) => (a-b))
    return {
        min: values[0],
        max: values[values.length-1]
    }
}

const calcSize = (value, ranges) => {
    return (2.2*value+0.8*ranges.max-3*ranges.min) / (ranges.max-ranges.min)
}

export const TagsCloud = ({tags}) => {
    const [ranges, setRanges] = useState(null)

    useEffect(() => {
        tags && setRanges(calcRanges(tags))
        tags && console.log()
    }, [tags])
    return (
        <div className="gap-1 tagsCloud">
        {ranges && tags.map((tag) =>
            <Link
                key={tag._id}
                to={`/tag/${tag._id}`}
                style={{
                    fontSize: `${calcSize(tag.popularity, ranges)}rem`,
                    color: colors[tag.popularity % colors.length],
                }}
            >{tag.name}</Link>
        )}
        </div>
    )
}