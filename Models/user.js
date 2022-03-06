const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        default:""
    },
    email:{
        type:String,
        require:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    display_name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('users', userModel)