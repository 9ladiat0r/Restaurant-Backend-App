const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : [true,'User name is required']
    },
    email : {
        type : String,
        required : [true,'Email is required']
    },
    password : {
        type : String,
        required : [true,'Password is required']
    },
    address : {
        type : Array,
    },
    phone : {
        type : String,
        required : [true,"phone number is required"]
    },
    usertype : {
        type : String,
        required : [true,'User type is required'],
        default : 'clinet',
        enum : ['clinet','admin','vendor','driver']
    },
    profile : {
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vB-49_BT-dirwttYZaeE_VByjlQ3raVJZg&s"
    },
    answer : {
        type : String,
        required : [true,"Answer is required"],
    }
},{timestamps : true})

module.exports = mongoose.model("User",userSchema);