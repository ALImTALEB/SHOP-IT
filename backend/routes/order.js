const express = require('express')
const router = express.Router()

const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder } = require('../controllers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, newOrder)

router.get('/order/:id', isAuthenticatedUser, getSingleOrder)

router.get('/orders/me', isAuthenticatedUser, myOrders)

router.get('/admin/orders', isAuthenticatedUser, authorizeRoles('admin') ,allOrders)

router.put('/admin/order/:id', isAuthenticatedUser, authorizeRoles('admin') ,updateOrder)

module.exports = router