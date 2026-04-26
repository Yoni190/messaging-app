const { Router } = require('express')
const verifyToken = require('../middleware/verifyToken')
const messageController = require('../controllers/messageController')

const router = Router()

router.get('/', verifyToken, messageController.index)

module.exports = router