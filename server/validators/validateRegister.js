const { body } = require('express-validator')
const { prisma } = require('../lib/prisma')

const validateRegister = [
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
        }),
        

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password should not be empty.')
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 character long.')
]

module.exports = { validateRegister }