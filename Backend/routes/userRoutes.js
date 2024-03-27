const express = require("express")
const router = express.Router()
const { registerUser, loginUser, updateUser , updateProfileImage , getMe } = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.post('/updateUser',protect,updateUser)
router.post('/updateProfileImage',protect,updateProfileImage)

module.exports = router
