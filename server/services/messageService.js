const { prisma } = require('../lib/prisma')

const getMessages = async () => {
    const messages = await prisma.message.findMany({})

    return messages
}

const fetchUserMessages = async (senderId, recipientId) => {
    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId, recipientId },
                { senderId: recipientId, recipientId: senderId }
            ]
        },
        include: {
            sender: {
                select: {
                    id: true,
                    username: true,
                    createdAt: true
                }
            },
            recipient: {
                select: {
                    id: true,
                    username: true,
                    createdAt: true
                }
            }
        }
    })

    return messages
}

module.exports = {
    getMessages,
    fetchUserMessages
}