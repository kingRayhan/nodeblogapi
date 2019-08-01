const User = require('../models/User')
const {
    role: { USER },
} = require('../utils/constants')
module.exports.login = (req, res) => {
    res.json(req.body)
}

module.exports.register = async (req, res) => {
    try {
        req.body.role = USER
        let newUser = await User.create({
            ...req.body,
        })
        res.json(newUser)
    } catch (error) {
        res.json(error)
    }
}
