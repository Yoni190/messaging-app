const { prisma } = require('../lib/prisma')


const fetchUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            createdAt: true
        }
    })

    return users
}

module.exports = {
    fetchUsers
}