const Publication = require('../models/Publication')

const getPublications = async (req, res) => {
    try {
        let publications

        switch (true) {
            case !!req.query.id:
                publications = await getPublication(req.query.id)
                break
            case !!req.query.user:
                publications = await getUserPublications(req.query.user)
                break
            default:
                console.log('default')
        }


        res.status(200).json({ publications })
    } catch (e) {
        console.log(e)
        res.status(500).json({error: e})
    }
}

const getUserPublications = async (id) => {
    return  (
        await Publication.
        find({author: id}).
        populate('author', 'name').
        populate('tags').
        populate('genres')
    )
}

const getPublication = async (id) => {
    return  (
        await Publication.
        findById(id).
        populate('author', 'name').
        populate('tags').
        populate('genres').
        populate('chapters')
    )
}

module.exports = { getPublications }