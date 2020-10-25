const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')

const AuthRoute = require('./Routes/Auth.route')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.get('/', async(req, res, next) =>{
//     res.send("Hello User")
// })

app.use('/', AuthRoute)

app.use(async(req, res, next) => {
    //Error here are handled because if the route is not handled by our app.get, so all the routes is handled by app.use
    //create a new error
    // const error = new Error("Not Found")
    // error.status = 404
    // next(error)
    next(createError.NotFound("PAGE NOT FOUND"))
})

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)  //500 is internal Server Error
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})