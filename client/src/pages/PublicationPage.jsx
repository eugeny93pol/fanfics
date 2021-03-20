import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useThemedClasses } from '../classnames/ThemedClasses'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/loaders/Loader'
import { useHttp } from '../hooks/http.hook'
import { Link, useParams } from 'react-router-dom'
import { GenresList } from '../components/genres/GenresList'
import { RatingStars } from '../components/rating/RatingStars'
import { Contents } from '../components/contents/Contents'
import { ChapterView } from '../components/chapter/ChapterView'
import { TagsList } from '../components/tags/TagsList'


export const PublicationPage = () => {
    const [hasAccess, setHasAccess] = useState(false)
    const [publication, setPublication] = useState(null)
    const { c } = useThemedClasses()
    const { userData, isAuth, token } = useContext(AuthContext)
    const { loading, error, clearError, request } = useHttp()
    const pageId = useParams().id

    const loadData = useCallback(async () => {
        try {
            const fetched = await request(
                `/api/publications/read/?id=${pageId}&user=${userData ? userData.id : 'guest'}`,
                'GET', null)
            setPublication(fetched.publications)
        } catch (e) {}
    }, [token, pageId, request, userData])

    useEffect(() => {
        loadData()
    },[loadData])

    useEffect( () => {
        console.log(error)
        clearError()
    }, [error, clearError])

    useEffect(() => {
        publication &&
        isAuth &&
        setHasAccess(userData.role === 'admin'
            || userData.id === publication.author._id)
    },[publication, userData])

    if (loading) return <Loader classes={['my-5']}/>

    return (
        <>{ !loading && publication &&
        <div className="row mt-3">
            <div className={`col ${c.textClass}`}>
                <h2>{publication.title}</h2>
                <GenresList genres={publication.genres}/>
                <p>{publication.description}</p>
                <div className="mb-3"><TagsList tags={publication.tags}/></div>
                <div className="row">
                    <div className="col-md-6 ms-1 ms-md-3 mt-4">
                        <div className={c.contentsClass}>
                            <Contents chapters={publication.chapters}/>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    {publication.chapters.map((chapter, i) =>
                        <ChapterView data={chapter} key={chapter._id}
                                     authorId={publication.author._id}
                                     index={i}
                        />)
                    }
                </div>

                <div className="text-center">
                    <div className="text-muted">{new Date(publication.updated).toLocaleString()}</div>
                    <div>
                        <Link to={`/profile/${publication.author._id}`}
                              className={`nav-link link-secondary px-0 ${ !hasAccess && 'disabled'}`}
                        >{publication.author.name}</Link>
                    </div>
                    <RatingStars
                        publicationId={publication._id}
                        average={publication.averageRating}
                        userRate={publication.rates[0]}
                        readonly={!isAuth || userData.id === publication.author._id}
                    />
                </div>

                <div className="row mt-5">
                    <div className="col col-sm-10 col-md-8 col-lg-6 col-xxl-4 m-auto">
                        <div className="mb-5">
                            <h4 className="mb-3">Comments</h4>
                            <hr/>
                            <div className={c.publicationPreviewClass}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="card-title"
                                        ><i className="bi bi-person-lines-fill"/> Vasya Pupkin</h6>

                                    </div>
                                    <div className="rounded p-2 commentWrapper position-relative mt-2">
                                        <p className="card-text mb-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque eius optio quod ratione tenetur.</p>
                                        <span className="text-muted text-end d-block">17.03.2021, 18:10:11</span>
                                    </div>
                                </div>
                            </div>


                            { isAuth &&
                            <form className={`mb-3 ${c.formClass}`} action="">
                                <div className="mb-3">
                                    <label htmlFor="inputComment" className="form-label">Place your comment here</label>
                                    <textarea
                                        className={c.inputClass}
                                        id="inputComment"
                                        placeholder="Write your comment here"
                                        name="comment"
                                        rows="3"/>
                                </div>
                                <div className="text-end">
                                    <button type="submit" className={c.btnClass}
                                    ><i className="bi bi-chat-text"/> Comment</button>
                                </div>
                            </form>
                            }


                        </div>
                    </div>
                </div>

            </div>
        </div>
        }</>
    )
}