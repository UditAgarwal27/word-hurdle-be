const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    noOfLetter:{
        type:Number,
        required:true
    },
    words:{
        type:Array,
        required:true,
        default:[]
    }
})

module.exports = mongoose.model('words', wordSchema);