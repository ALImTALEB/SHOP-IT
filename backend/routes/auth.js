const express = require('express')
const router = express.Router()

const { registerUser, loginUser, logout, forgotPassword } = require('../controllers/authController')

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/logout', logout)

router.post('/password/forgot', forgotPassword)

module.exports = router