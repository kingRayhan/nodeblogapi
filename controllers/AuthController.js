const User = require('../models/User')
const bcrypt = require('bcryptjs')

const db = require('../db')
const { sign } = require('jsonwebtoken')
const {
    role: { USER },
} = require('../utils/constants')

module.exports.login = async (req, res) => {
    let [result] = await db.query(
        `SELECT * FROM users WHERE username = '${req.body.user}' OR email = '${req.body.user}' `
    )

    let user = result[0]

    if (!user) {
        res.status(404).json({
            message: 'user not found',
        })
    }
    let isMatched = await bcrypt.compare(req.body.password, user.password)
    if (isMatched) {
        res.json({
            token: sign(
                {
                    id: user.id,
                },
                process.env.SECRET
            ),
        })
    } else {
        res.json({
            message: 'Password did not matched',
        })
    }
}

module.exports.register = async (req, res) => {
    req.body.role = USER
    let newUser = await User.create({
        ...req.body,
    })
    res.json(newUser)
}
