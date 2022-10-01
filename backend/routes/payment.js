const express = require('express')
const router = express.Router()

const {

    processPayment
   
  } = require('../controllers/paymentController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.post('/payment/process', isAuthenticatedUser, processPayment)


module.exports = router