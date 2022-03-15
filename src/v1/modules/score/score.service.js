const { models } = require("../../model");
const { find_percent_score } = require("../../util/config");

module.exports = {
  new_user: async () => {
    try {
      const user = new models.score();
      user.save();
    } catch (err) {
      console.log(err);
    }
  },

  daily_score: async (attempts) => {
    let final_score = 0;
    let percent_score = 0;

    const score = await models.score.findOne();
    final_score =
      score.score_one +
      score.score_two +
      score.score_three +
      score.score_four +
      score.score_five +
      score.score_six +
      score.score_seven +
      score.score_eight;
    switch (attempts) {
      case 1:
        module.exports.update_score_one_class(score.score_one);
        percent_score = find_percent_score(score.score_one, final_score);
        break;
      case 2:
        module.exports.update_score_two_class(score.score_two);
        percent_score = find_percent_score(score.score_two, final_score);
        break;
      case 3:
        module.exports.update_score_three_class(score.score_three);
        percent_score = find_percent_score(score.score_three, final_score);
        break;
      case 4:
        module.exports.update_score_four_class(score.score_four);
        percent_score = find_percent_score(score.score_four, final_score);
        break;
      case 5:
        module.exports.update_score_five_class(score.score_five);
        percent_score = find_percent_score(score.score_five, final_score);
        break;
      case 6:
        module.exports.update_score_six_class(score.score_six);
        percent_score = find_percent_score(score.score_six, final_score);
        break;
      case 7:
        module.exports.update_score_seven_class(score.score_seven);
        percent_score = find_percent_score(score.score_seven, final_score);
        break;
      case 8:
        module.exports.update_score_eight_class(score.score_eight);
        percent_score = find_percent_score(score.score_eight, final_score);
        break;
    }
    return percent_score;
  },

  update_score_one_class: async (score_value) => {
    try {
      const updates_score = await models.score.findOneAndUpdate(
        { scoreName: "DailyScore" },
        { scoreOne: score_value + 1 },
        { new: true }
      );
      if (updates_score) {
        console.log(
          `Score class ScoreOne has been incremented from ${score_value} to ${
            score_value + 1
          }`
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  update_score_two_class: async (score_value) => {
    try {
      const updates_score = await models.score.findOneAndUpdate(
        { scoreName: "DailyScore" },
        { scoreTwo: score_value + 1 },
        { new: true }
      );
      if (updates_score) {
        console.log(
          `Score class ScoreTwo has been incremented from ${score_value} to ${
            score_value + 1
          }`
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  update_score_three_class: async (score_value) => {
    try {
      const updates_score = await models.score.findOneAndUpdate(
        { scoreName: "DailyScore" },
        { scoreThree: score_value + 1 },
        { new: true }
      );
      if (updates_score) {
        console.log(
          `Score class ScoreThree has been incremented from ${score_value} to ${
            score_value + 1
          }`
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  update_score_four_class: async (score_value) => {
    try {
      const updates_score = await models.score.findOneAndUpdate(
        { scoreName: "DailyScore" },
        { scoreFour: score_value + 1 },
        { new: true }
      );
      if (updates_score) {
        console.log(
          `Score class ScoreFour has been incremented from ${score_value} to ${
            score_value + 1
          }`
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  update_score_five_class: async (score_value) => {
    try {
      const updates_score = await models.score.findOneAndUpdate(
        { scoreName: "DailyScore" },
        { scoreFive: score_value + 1 },
        { new: true }
      );
      if (updates_score) {
        console.log(
          `Score class ScoreFive has been incremented from ${score_value} to ${
            score_value + 1
          }`
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  update_score_six_class: async (score_value) => {
    try {
      const updates_score = await models.score.findOneAndUpdate(
        { scoreName: "DailyScore" },
        { scoreSix: score_value + 1 },
        { new: true }
      );
      if (updates_score) {
        console.log(
          `Score class ScoreSix has been incremented from ${score_value} to ${
            score_value + 1
          }`
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  update_score_seven_class: async (score_value) => {
    try {
      const updates_score = await models.score.findOneAndUpdate(
        { scoreName: "DailyScore" },
        { scoreSeven: score_value + 1 },
        { new: true }
      );
      if (updates_score) {
        console.log(
          `Score class ScoreSeven has been incremented from ${score_value} to ${
            score_value + 1
          }`
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  update_score_eight_class: async (score_value) => {
    try {
      const updates_score = await models.score.findOneAndUpdate(
        { scoreName: "DailyScore" },
        { scoreEight: score_value + 1 },
        { new: true }
      );
      if (updates_score) {
        console.log(
          `Score class ScoreEight has been incremented from ${score_value} to ${
            score_value + 1
          }`
        );
      }
    } catch (err) {
      console.log(err);
    }
  },
};
