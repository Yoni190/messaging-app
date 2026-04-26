const { fetchUsers, edit } = require('../services/userService')

const getUser = (req, res) => {
    const user = req.authData

    return res.json({ user })
}

const getUsers = async (req, res) => {
    try {
        const users = await fetchUsers()

        return res.json({ users })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

const editProfile = async (req, res) => {
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
    getUser,
    getUsers,
    editProfile
}