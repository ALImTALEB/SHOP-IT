const express = require('express')
const router = express.Router()


const { getProducts,
     newProduct,
      getSingleProduct,
       updateProduct,
        deleteProduct
     } = require('../controllers/productController')


     const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')


router.get('/products', getProducts);

router.get('/product/:id', getSingleProduct)

router.post('/admin/product/new',isAuthenticatedUser, authorizeRoles('admin'), newProduct)

router.route('/admin/product/:id')
                 .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
                 .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)


module.exports = router