const express = require('express')
const router = express.Router()

const { registerUser, loginUser, logout,
     forgotPassword, resetPassword, getUserProfile,
      updatePassword, updateProfile, allUsers, getUserDetails } = require('../controllers/authController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/logout', logout)

router.post('/password/forgot', forgotPassword)

router.put('/password/reset/:token', resetPassword)

router.get('/me', isAuthenticatedUser, getUserProfile)

router.put('/password/update', isAuthenticatedUser, updatePassword)

router.put('/me/update', isAuthenticatedUser, updateProfile)

router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), allUsers)

router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)

module.exports = router