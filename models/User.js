const db = require('../db')
const Sequelize = require('sequelize')
const { hashSync } = require('bcryptjs')
const {
    role: { ADMIN, MOD, USER },
} = require('../utils/constants')

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isValidUsername(value) {
                if (value.split(' ').length > 1) throw new Error('Username can not contain white space')
            },
            len: {
                arg: [5, 25],
                msg: 'You username length must be within 5 to 25',
            },
        },
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                arg: true,
                msg: 'Emai, is not valid',
            },
        },
        unique: true,
    },
    role: {
        type: Sequelize.ENUM(ADMIN, MOD, USER),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                arg: [5, 15],
                msg: 'You password length must be within 5 to 15',
            },
        },
    },
})

User.beforeCreate(user => {
    user.password = hashSync(user.password)
})

module.exports = User
