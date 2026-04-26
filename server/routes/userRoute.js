const { Router } = require('express')
const userController = require('../controllers/userController')
const router = Router()
const verifyToken = require('../middleware/verifyToken')


router.get('/profile', verifyToken, userController.getUser)
router.get('/', verifyToken, userController.getUsers)
router.post('/edit-profile', verifyToken, userController.editProfile)

module.exports = router