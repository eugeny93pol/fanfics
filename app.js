const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

const PORT = process.env.PORT || config.get('port')

app.use(express.json({ extended: true}))

app.use('/api', require('./routes/index.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', ((req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    }))
}

async function start() {
    try {
        await mongoose.connect(config.get('dbUri'), {
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