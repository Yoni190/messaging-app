const { Router } = require('express')
const verifyToken = require('../middleware/verifyToken')
const messageController = require('../controllers/messageController')

const router = Router()

router.get('/', verifyToken, messageController.index)
router.get('/:senderId/:recipientId', verifyToken, messageController.getUserMessages)

module.exports = router