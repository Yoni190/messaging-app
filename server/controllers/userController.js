
const getUser = (req, res) => {
    const user = req.authData

    return res.json({ user })
}

module.exports = {
    getUser
}