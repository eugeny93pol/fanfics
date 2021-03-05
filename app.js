const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

require('dotenv').config()

const app = express()

const PORT = process.env.PORT

app.use(express.json({ extended: true}))
app.use('/api', require('./routes/index.route'))

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
        app.listen(PORT, () =>console.log(`Server start on port ${PORT} ...`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(-1);
    }
}

start()