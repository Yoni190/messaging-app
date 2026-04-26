const { body } = require('express-validator')

const validateMessage = [
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message should not be empty.')
]

module.exports = validateMessage