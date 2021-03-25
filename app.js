const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const path = require('path')
const passport = require('passport')
require('dotenv').config()

// from this
const FacebookStrategy = require("passport-facebook").Strategy;
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

// Facebook Strategy
let user = {}
passport.use(new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(JSON.stringify(profile))
        user = { ...profile };
        return cb(null, profile);
    }));



//to this


const app = express()
const httpServer = http.createServer(app)
const io = require('socket.io')(httpServer)

const PORT = process.env.PORT
app.use(cors(/*{origin: '*'}*/))
// app.options('*', cors())
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, PATCH')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     res.header('Access-Control-Allow-Credentials', true)
//     next()
// })


app.use(express.json({ extended: true}))

app.use(passport.initialize())

app.use('/api', require('./routes/index.route'))
//<--
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        res.redirect("/");
    });
//-->

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