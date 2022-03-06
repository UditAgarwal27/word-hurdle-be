const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true,
        default:0
    }
})

module.exports = mongoose.model('leaderboards', leaderboardSchema);