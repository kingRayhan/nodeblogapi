const Router = require('express').Router()

const { login, register } = require('../controllers/AuthController')

const catchError = require('../utils/catchError')

Router.post('/login', login)
Router.post('/register', catchError(register))

module.exports = Router
