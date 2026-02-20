const express = require('express')
const router = express.Router()

const usercontroller = require('../controller/user.controller')
const adminroute = require('../middleware/admin.middleware')
const auth = require('../middleware/auth.middleware')

router.post("/register",usercontroller.register)
router.get("/Login",usercontroller.Login)
router.get("/home",auth,adminroute,(req,res)=>{
    res.send("Welcome to home page")
}) 



module.exports = router