const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    Username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.Password, salt)
        this.Password = hashPassword
        next()
        
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function (Password) {
    try {
       return await bcrypt.compare(Password, this.Password)
    } catch (error) {
        throw error
    }
} 

const User = mongoose.model('user', UserSchema)
module.exports = User