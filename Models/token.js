const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    refresh_token:{
        type:String,
        required:true
    },
    scope:{
        type:String,
        required: true
    },
    token_type:{
        type:String,
        required:true
    },
    id_token:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("token", tokenSchema);