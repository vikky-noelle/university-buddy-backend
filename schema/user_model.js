const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: "Required"
    },
    PassWord: {
        type: String
    }
});

mongoose.model("Users", UserSchema)