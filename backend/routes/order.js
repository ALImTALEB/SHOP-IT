const express = require('express')
const router = express.Router()

const { newOrder } = require('../controllers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, newOrder)

module.exports = router