require('dotenv').config()
const db = require('./db')

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', require('./routes/auth'))

let port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Server working at http://localhost:' + port)
})

db.authenticate()
    .then(r => console.log('Database connected'))
    .catch(e => console.log(e.message))

db.sync()
