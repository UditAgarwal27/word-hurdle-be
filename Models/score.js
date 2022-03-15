const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    scoreName:{
        type:String,
        required:true,
        default:"DailyScore"
    },
    score1:{
        type:Number,
        required:true,
        default:0
    },
    score2:{
        type:Number,
        required:true,
        default:0
    },
    score3:{
        type:Number,
        required:true,
        default:0
    },
    score4:{
        type:Number,
        required:true,
        default:0
    },
    score5:{
        type:Number,
        required:true,
        default:0
    },
    score6:{
        type:Number,
        required:true,
        default:0
    },
    score7:{
        type:Number,
        required:true,
        default:0
    },
    score8:{
        type:Number,
        required:true,
        default:0
    },
})

module.exports = mongoose.model("dailypercentscore", scoreSchema);