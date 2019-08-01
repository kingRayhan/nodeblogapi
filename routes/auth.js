const Router = require('express').Router()

const { login, register } = require('../controllers/AuthController')

Router.post('/login', login)
Router.post('/register', register)

module.exports = Router
