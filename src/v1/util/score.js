const { models } = require("../model");


module.exports = {
  find_percent_score: (attempts, score, final_score) => {
    let curr_score_class = "score" + attempts;
    let score_value = score[curr_score_class];
    return (((score_value + 1) / (final_score + 1)) * 100).toFixed(2);
  },

  reset_daily_score: () => {
    const update_body = {
      $set: {
        "score1": 0,
        "score2": 0,
        "score3": 0,
        "score4": 0,
        "score5": 0,
        "score6": 0,
        "score7": 0,
        "score8": 0
      }
    }
    models.score.findOneAndUpdate({ "scoreName": "DailyScore" }, update_body, { new: true })
      .then(() => {
        console.log("Resetting daily score to default values");
      })
      .catch(err => {
        console.log(err);
      })
  }
};

