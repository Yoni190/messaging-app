const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')
const { validateRegister } = require('../validators/validateRegister')
const { validateLogin } = require('../validators/validateLogin')
const verifyToken = require('../middleware/verifyToken')

router.post('/register', validateRegister, authController.register)
router.post('/login', validateLogin, authController.login)
router.get('/verify-token', verifyToken, authController.me)


module.exports = router