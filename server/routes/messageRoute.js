const { Router } = require('express')
const verifyToken = require('../middleware/verifyToken')
const messageController = require('../controllers/messageController')
const validateMessage = require('../validators/validateMessage')

const router = Router()

router.get('/', verifyToken, messageController.index)
router.get('/:senderId/:recipientId', verifyToken, messageController.getUserMessages)
router.post('/:recipientId', verifyToken, validateMessage, messageController.sendMessage)

module.exports = router