const express = require('express')
const router = express.Router()


const { getProducts,
     newProduct,
      getSingleProduct,
       updateProduct,
        deleteProduct
     } = require('../controllers/productController')


     const { isAuthenticatedUser } = require('../middlewares/auth')


router.get('/products',isAuthenticatedUser, getProducts);

router.post('/admin/product/new', newProduct)

router.get('/product/:id', getSingleProduct)

router.route('/admin/product/:id')
                 .put(updateProduct)
                 .delete(deleteProduct)


module.exports = router