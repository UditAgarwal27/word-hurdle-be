const mongoose = require('mongoose');

const score = new mongoose.Schema({
    scoreName:{
        type:String,
        require:true,
        default:"DailyScore"
    },
    scoreOne:{
        type:Number,
        required:true,
        default:0
    },
    scoreTwo:{
        type:Number,
        required:true,
        default:0
    },
    scoreThree:{
        type:Number,
        required:true,
        default:0
    },
    scoreFour:{
        type:Number,
        required:true,
        default:0
    },
    scoreFive:{
        type:Number,
        required:true,
        default:0
    },
    scoreSix:{
        type:Number,
        required:true,
        default:0
    },
    scoreSeven:{
        type:Number,
        required:true,
        default:0
    },
    scoreEight:{
        type:Number,
        required:true,
        default:0
    }
})

module.exports = score;