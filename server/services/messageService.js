const { prisma } = require('../lib/prisma')

const getMessages = async () => {
    const messages = await prisma.message.findMany({})

    return messages
}

module.exports = {
    getMessages
}