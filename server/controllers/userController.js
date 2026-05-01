const { fetchUsers, edit, fetchUser, fetchAuthUser } = require('../services/userService')
const { validationResult } = require('express-validator')

const getAuthUser = async (req, res) => {
    const userId = req.authData.id

    const user = await fetchAuthUser(userId)

    return res.json({ user })
}

const getUsers = async (req, res) => {
    const user = req.authData
    try {
        const users = await fetchUsers(user.id)

        return res.json({ users })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

const getUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const user = await fetchUser(userId)

        return res.json({ user })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

const editProfile = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg
        })
    }
    
    try {
        const { username } = req.body
        const user = req.authData

        const message = await edit(username, user.id)

        return res.json({ message })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

module.exports = {
    getAuthUser,
    getUser,
    getUsers,
    editProfile
}