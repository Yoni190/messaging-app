const jwt = require('jsonwebtoken')
const { prisma } = require('../lib/prisma')
const bcrypt = require('bcrypt')
require('dotenv').config()

const createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    })

    const token = jwt.sign({ user }, process.env.JWT_SECRET)

    return token
}

module.exports = {
    createUser
}