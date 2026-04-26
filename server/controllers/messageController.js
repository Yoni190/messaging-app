const { getMessages, fetchUserMessages } = require('../services/messageService')

const index = async (req, res) => {
    try {
        const messages = await getMessages()

        return res.json({ messages })
    } catch (error) {
        console.error(error)
        return res.status(500).messages({ message: 'Something went wrong' })
    }
}

const getUserMessages = async (req, res) => {
    try {
        const senderId = parseInt(req.params.senderId)
        const recipientId = parseInt(req.params.recipientId)

        const messages = await fetchUserMessages(senderId, recipientId)

        return res.json({ messages })
    } catch (error) {
        console.error(error)
        return res.status(500).messages({ message: 'Something went wrong' })
    }
}

module.exports = {
    index,
    getUserMessages
}