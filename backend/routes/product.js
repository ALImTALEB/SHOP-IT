const express = require('express')
const router = express.Router()


const { getProducts,
     newProduct,
      getSingleProduct,
       updateProduct,
        deleteProduct
     } = require('../controllers/productController')


     const { isAuthenticatedUser } = require('../middlewares/auth')


router.get('/products', getProducts);

router.get('/product/:id', getSingleProduct)

router.post('/admin/product/new',isAuthenticatedUser, newProduct)

router.route('/admin/product/:id')
                 .put(isAuthenticatedUser, updateProduct)
                 .delete(isAuthenticatedUser, deleteProduct)


module.exports = router