var cron = require('node-cron');

const { reset_daily_score } = require('../util/score');

const task = cron.schedule("0 0 0 * * *", () => {
    // reset_daily_score();
    console.log("10 seconds");
})

module.exports = task;