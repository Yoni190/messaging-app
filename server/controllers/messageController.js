const { getMessages, fetchUserMessages, createMessage } = require('../services/messageService')
const { validationResult } = require('express-validator')

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

const sendMessage = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg
        })
    }

    try {
        const recipientId = parseInt(req.params.recipientId)
        const user = req.authData
        const { message } = req.body

        const result = await createMessage(user.id, recipientId, message)

        return res.json({ result })
    } catch (error) {
        console.error(error)
        return res.status(500).messages({ message: 'Something went wrong' })
    }
}

module.exports = {
    index,
    getUserMessages,
    sendMessage
}