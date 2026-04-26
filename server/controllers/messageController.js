const { getMessages } = require('../services/messageService')

const index = async (req, res) => {
    try {
        const messages = await getMessages()

        return res.json({ messages })
    } catch (error) {
        console.error(error)
        return res.status(500).messages({ message: 'Something went wrong' })
    }
}

module.exports = {
    index
}