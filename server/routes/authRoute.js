const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')
const { validateRegister } = require('../validators/validateRegister')
const { validateLogin } = require('../validators/validateLogin')

router.post('/register', validateRegister, authController.register)
router.post('/login', validateLogin, authController.login)


module.exports = router