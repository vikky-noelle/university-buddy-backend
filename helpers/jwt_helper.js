const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const { token } = require('morgan')

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: "University Buddy",
            }

            const secret = "Some super secret"
            const option = {
                expiresIn: "1h",
                issuer: "universitybuddy.com",
                audience: userId
            }
            JWT.sign(payload, secret, option, (err, token) => {
                if(err)
                    return reject(err)
                
                resolve(token)
            })
        })
    }
}