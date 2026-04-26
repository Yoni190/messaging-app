const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')
const { validateRegister } = require('../validators/validateRegister')

router.post('/register', validateRegister, authController.register)


module.exports = router