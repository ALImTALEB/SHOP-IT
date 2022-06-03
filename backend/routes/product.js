const express = require('express')
const router = express.Router()


const { getProducts, newProduct } = require('../controllers/productController')


router.get('/products', getProducts);

router.route('/product/new').post(newProduct)


module.exports = router