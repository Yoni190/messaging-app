const { fetchUsers } = require('../services/userService')

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

module.exports = {
    getUser,
    getUsers
}