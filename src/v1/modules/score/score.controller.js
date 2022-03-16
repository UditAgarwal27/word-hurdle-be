const res = require("express/lib/response");
const { new_user, daily_score } = require("./score.service");

module.exports = {
  daily_score: async (req, res) => {
    const { attempts } = req.body;
    try {
      const percent_score = await daily_score(attempts);
      const _response = { percentScore: percent_score };
      res.status(200).json(_response);
    } catch (err) {
      console.log(err);
      const _response = { percentScore: 0 };
      res.status(500).json(_response);
    }
  },
};
