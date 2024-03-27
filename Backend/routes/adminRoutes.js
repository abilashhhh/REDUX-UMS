const express=require('express')
const adminRoutes=express.Router()
const {adminLogin,getAdmin,getUsers,blockUser,addUser,editUser}=require('../controllers/adminController')
const {adminProtect} =require('../middleware/authMiddleware')

adminRoutes.post('/adminLogin',adminLogin)
adminRoutes.get('/getAdmin',adminProtect,getAdmin)
adminRoutes.get('/getUsers',adminProtect,getUsers)
adminRoutes.post('/block',adminProtect,blockUser)
adminRoutes.post('/addUser',adminProtect,addUser)
adminRoutes.post('/editUser',adminProtect,editUser)

module.exports=adminRoutes 