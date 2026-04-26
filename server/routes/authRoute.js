const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')
const { validateRegister } = require('../validators/validateRegister')

router.post('/register', validateRegister, authController.register)
router.post('/login', authController.login)


module.exports = router