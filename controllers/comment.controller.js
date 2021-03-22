const Comment = require('../models/Comment')
const User = require('../models/User')
const Publication = require('../models/Publication')
const errorHandler = require('../utils/errorHandler')

let socketConnection

const postComment = async (req, res) => {
    try {
        const publication = await Publication.findById(req.body.publication)
        //const user = await User.findById(req.userData.userId)
        const comment = new Comment({
            publication: publication._id,
            user: req.userData.userId,
            text: req.body.comment
        })

        await comment.save()
        await publication.comments.push(comment)
        //await user.comments.push(comment)
        await publication.save()
        //await user.save()

        const emitComment = await Comment.findById(comment._id).populate({
            path: 'user',
            select: 'name'
        })

        socketConnection.to(req.body.publication).emit('comment', emitComment)

        res.status(200).json({ comment })
    } catch (e) {
        errorHandler(res, e)
    }
}

const deleteComments = async (comments) => {
    const result = await Comment.deleteMany({_id: {$in: comments}})
    return result.n
}

const subscribeToComments = (io) => {
    socketConnection = io
    io.on('connection', (socket) => {
        socket.on('subscribe', (publication) => {
            socket.join(publication._id)
        })
    })
}

module.exports = { postComment, subscribeToComments, deleteComments }