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

    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' })

    return token
}

const loginUser = async (username, password) => {
    const user = await prisma.user.findUnique({
        where: { username }
    })

    if(!user) {
        throw new Error('USER_NOT_FOUND')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('WRONG_PASSWORD')
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, createdAt: user.createdAt},
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    return token
}

module.exports = {
    createUser,
    loginUser
}