require('dotenv').config()
const db = require('./db')
const formatErrors = require('./utils/formatErrors')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', require('./routes/auth'))

app.use((err, req, res, next) => {
    if (err.errors) res.json(formatErrors(err.errors))
    // controlled error
    else {
        let errorObject = {
            message: 'Internal server error',
        }

        if (process.env.NODE_ENV === 'dev') errorObject.error = err.original.sqlMessage

        res.status(500).json(errorObject)
    }
})

db.authenticate()
    .then(r => console.log('Database connected'))
    .catch(e => console.log(e.message))

db.sync()

module.exports = app
