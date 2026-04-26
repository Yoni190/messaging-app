const jwt = require('jsonwebtoken')
const { prisma } = require('../lib/prisma')
const bcrypt = require('bcrypt')
const { createUser } = require('../services/authService')
require('dotenv').config()

const register = async (req, res) => {
    try {
        const { username, password } = req.body
        const token = await createUser(username, password)

        return res.json({ token })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    register
}