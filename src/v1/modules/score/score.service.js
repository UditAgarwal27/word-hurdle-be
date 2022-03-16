const { models } = require("../../model");
const { find_percent_score } = require("../../util/score");

module.exports = {

  daily_score: async (attempts) => {
    let final_score = 0;
    let percent_score = 0;

    const score = await models.score.findOne();
    final_score = score.score1 + score.score2 + score.score3 + score.score4 + score.score5 + score.score6 + score.score7 + score.score8;
    module.exports.update_score_class(attempts, score);
    percent_score = find_percent_score(attempts, score, final_score);
    return percent_score;
  },

  update_score_class: async(attempts, score)=>{
    let curr_score_class = "score"+attempts;
    let score_value = score[curr_score_class];
    let update_doc = {};
    update_doc[`${curr_score_class}`] = score_value + 1 ;
    try {
      const update_score = await models.score.findOneAndUpdate ({scoreName :"DailyScore"}, update_doc , {new:true});
      if (update_score) {
        console.log(
          `Score class ${curr_score_class} has been incremented from ${score_value} to ${score_value + 1}`
        )
      }
    } catch (err) {
      console.log(err);
    }
  },

};
