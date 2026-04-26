const { body } = require('express-validator')
const { prisma } = require('../lib/prisma')

const validateProfileData = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username should not be empty.')
        .isLength({ min: 3, max: 15 })
        .withMessage('Username should be between 3 and 15 characters long.')
        .custom(async (username) => {
            const existingUser = await prisma.user.findUnique({
                where: { username }
            })

            if(existingUser) {
                throw new Error('Username already taken')
            }

            return true
        })
]

module.exports = validateProfileData