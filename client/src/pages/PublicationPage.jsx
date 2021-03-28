import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/loaders/Loader'
import { useHttp } from '../hooks/http.hook'
import { Link, useParams, useHistory } from 'react-router-dom'
import { GenresList } from '../components/genres/GenresList'
import { RatingStars } from '../components/rating/RatingStars'
import { Contents } from '../components/contents/Contents'
import { ChapterView } from '../components/chapter/ChapterView'
import { TagsList } from '../components/tags/TagsList'
import { CommentsModule } from '../components/comments/CommentsModule'
import { PublicationMenu } from '../components/publication/PublicationMenu'
import { ToastServerErrors } from '../components/toast/ToastServerErrors'


export const PublicationPage = () => {
    const [hasAccess, setHasAccess] = useState(false)
    const [publication, setPublication] = useState(null)
    const { c } = useThemedClasses()
    const { userData, isAuth } = useContext(AuthContext)
    const { loading, error, clearError, request } = useHttp()
    const pageId = useParams().id
    const history = useHistory()

    const loadData = useCallback(async () => {
        try {
            const fetched = await request(
                `/api/publications/read/?id=${pageId}&user=${userData ? userData.id : 'guest'}`,
                'GET', null)
            setPublication(fetched.publications)
        } catch (e) {}
    }, [pageId, request, userData])

    const deleteHandler = useCallback(() => {
        setPublication(null)
        history.push('/')
    }, [publication])

    useEffect(() => {
        loadData()
    },[loadData])

    useEffect(() => {
        publication &&
        isAuth &&
        setHasAccess(userData.role === 'admin'
            || userData.id === publication.author._id)
    },[publication, userData, isAuth])

    if (loading) return <Loader classes={['my-5']}/>

    return (
        <>{ !loading && publication &&
        <div className="row mt-3">
            <div className={`col position-relative ${c.textClass}`}>
                <h2 className="publication-title">{publication.title}</h2>
                {hasAccess &&
                    <PublicationMenu publication={publication} cbDelete={deleteHandler}/>
                }
                <GenresList genres={publication.genres}/>
                <p>{publication.description}</p>
                <div className="mb-3"><TagsList tags={publication.tags}/></div>
                { publication.chapters.length ?
                    <div className="row">
                        <div className="col-md-6 ms-md-3 mt-4">
                            <div className={c.contentsClass}>
                                <Contents chapters={publication.chapters}/>
                            </div>
                        </div>
                    </div>
                    : ''
                }

                <div className="mt-4">
                    {publication.chapters.map((chapter, i) =>
                        <ChapterView data={chapter} key={chapter._id}
                                     authorId={publication.author._id}
                                     index={i}
                        />)
                    }
                </div>

                <div className="text-center mb-5">
                    <div className="text-muted">{new Date(publication.updated).toLocaleString()}</div>
                    <div>
                        <Link to={`/profile/${publication.author._id}`}
                              className={`nav-link link-secondary px-0 ${ !hasAccess ? 'disabled' : ''}`}
                        >{publication.author.name}</Link>
                    </div>
                    <RatingStars
                        publicationId={publication._id}
                        average={publication.averageRating}
                        userRate={publication.rates[0]}
                        readonly={!isAuth || userData.id === publication.author._id}
                    />
                </div>

                { isAuth &&
                    <div className="row">
                        <div className="col col-sm-10 col-md-8 col-lg-6 col-xxl-4 m-auto">
                            <div className="mb-5">
                                <CommentsModule publication={publication}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        }
        <ToastServerErrors error={error} cbClearError={clearError}/>
        </>
    )
}