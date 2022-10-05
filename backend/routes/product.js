const express = require('express')
const router = express.Router()


const { getProducts,
     newProduct,
      getSingleProduct,
       updateProduct,
        deleteProduct,
        createProductReview,
        getProductReviews,
        deleteReview,
        getAdminProducts
     } = require('../controllers/productController')


     const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')


router.get('/products', getProducts);
router.get('/admin/products', getAdminProducts);

router.get('/product/:id', getSingleProduct)

router.post('/admin/product/new',isAuthenticatedUser, authorizeRoles('admin'), newProduct)

router.route('/admin/product/:id')
                 .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
                 .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.put('/review', isAuthenticatedUser, createProductReview)
router.get('/reviews', isAuthenticatedUser, getProductReviews)
router.delete('/reviews', isAuthenticatedUser, deleteReview)


module.exports = router