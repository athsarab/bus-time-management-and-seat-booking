const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    mNo:{
        type: Number,
        required:true,
    },
    password : {
        type:String,
        required:true,
    },
    userEntry : {
        type:Number,
        required:true,
    },
});

module.exports = User = mongoose.model("user", UserSchema);