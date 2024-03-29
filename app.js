const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const path = require('path')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()


const app = express()
const httpServer = http.createServer(app)
const io = require('socket.io')(httpServer)
const PORT = process.env.PORT

app.use(cors({//
    origin:"https://mordor-fanfics.herokuapp.com/",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true
}))

app.use(express.json({ extended: true}))

app.use('/oauth', require('./routes/oauth.route.js'))
app.use('/api', require('./routes/index.route'))

app.use(passport.initialize())

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', ((req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    }))
}

async function start() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        httpServer.listen(PORT, () =>console.log(`Server start on port ${PORT} ...`))
        require('./middleware/passport.middleware')(passport)
        require('./controllers/comment.controller').subscribeToComments(io)
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(-1);
    }
}

start()