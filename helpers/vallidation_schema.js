const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    Username: Joi.string().email().lowercase().required(),
    Password: Joi.string().min(8).required()
})

module.exports = {
    authSchema
}