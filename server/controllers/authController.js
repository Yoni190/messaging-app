const { createUser, loginUser } = require('../services/authService')
const { validationResult } = require('express-validator')

const register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg
        })
    }

    try {
        const { username, password } = req.body
        const token = await createUser(username, password)

        return res.json({ token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

const login = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg
        })
    }


    try {
        const { username, password } = req.body
        const token = await loginUser(username, password)

        return res.json({ token })
    } catch (error) {
        if(error.message == 'USER_NOT_FOUND') {
            return res.status(401).json({ message: 'User not found.' })
        }

        if(error.message == 'WRONG_PASSWORD') {
            return res.status(401).json({ message: 'Wrong Password' })
        }
        console.error(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

const me = (req, res) => {
    return res.json({ message: 'Authenticated' })
}

module.exports = {
    register,
    login,
    me
}