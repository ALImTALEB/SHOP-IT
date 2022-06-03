const express = require('express')
const router = express.Router()


const { getProducts, newProduct, getSingleProduct } = require('../controllers/productController')


router.get('/products', getProducts);

router.post('/product/new', newProduct)

router.get('/product/:id', getSingleProduct)


module.exports = router