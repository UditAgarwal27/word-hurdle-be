var cron = require('node-cron');

const {reset_daily_score} = require('../Services/database');

const task = cron.schedule("0 0 0 * * *",()=>{
    reset_daily_score();
})
module.exports = task;

