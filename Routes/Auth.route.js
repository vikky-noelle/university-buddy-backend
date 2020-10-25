//All the authentication will be handled by this route
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User.model')
const{ authSchema } = require('../helpers/vallidation_schema')
const{ signAccessToken } = require('../helpers/jwt_helper')

router.post('/register', async(req, res, next) =>{
    // res.send("Register route")
   
    try {
        // const {Username , Password} = req.body
        // if(!Username || !Password) throw createError.BadRequest()
        const result = await authSchema.validateAsync(req.body)
        // console.log(result);

        const doesExist = await User.findOne({Username: result.Username})
        if(doesExist) 
            throw createError.Conflict(`${result.Username} is already been registered`)

        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        res.send({accessToken})

    } catch(error) {
        if(error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login', async(req, res, next) =>{
    // res.send("Login route")
   
    try {
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({Username: result.Username})

        if(!user) 
            throw createError.NotFound("User not Registered")

        const isMatch = await user.isValidPassword(result.Password)
        if(!isMatch) throw createError.Unauthorized('Username/Password not Valid')

        
        res.send(result)
        
    } catch (error) {
        if(error.isJoi === true) 
            return next(createError.BadGateway("Invalid Usename/Password"))
        next(error)
    }
})


router.delete('/logout', async(req, res, next) =>{
    res.send("Logout route")
})





module.exports = router