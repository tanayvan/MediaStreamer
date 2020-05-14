const express= require('express')
const router= express.Router()
const {signup} = require('../controller/auth')
const {check} = require('express-validator')


router.post('/signup',[
check("name","name should be atleast 3 character").isLength({min:3}),
check("email","email is required").isEmail(),
check("password","password should be atleast 6 character").isLength({min:6})],
signup
)


module.exports=router