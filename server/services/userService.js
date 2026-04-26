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

const edit = async (username, userId) => {
    await prisma.user.update({
        where: { id: userId},
        data: {
            username
        }
    })
    

    return { message: 'Updated Successfully' }
}

module.exports = {
    fetchUsers,
    edit
}