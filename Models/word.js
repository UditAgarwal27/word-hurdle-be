const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    words:{
        type:Array,
        required:true,
        default:[]
    }
})

module.exports = mongoose.model('words', wordSchema);