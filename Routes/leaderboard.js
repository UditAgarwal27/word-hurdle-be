const router = require("express").Router();
const axios = require("axios").default;
const leaderboardModel = require("../Models/leaderboard");

router.post("/storeData", async (req, res) => {
  const headers = req.headers;
  const access_token_withBearer = headers["authorization"];
  const access_token =
    access_token_withBearer === null || access_token_withBearer === undefined
      ? ""
      : access_token_withBearer.split(" ")[1];

  if (!access_token_withBearer)
    return res.status(400).json({ msg: "User did not send access token" });
  let { email, score } = req.body;

  await axios
    .get(
      "https://people.googleapis.com/v1/people/me?personFields=emailAddresses",
      {
        headers: {
          Accept: "application/json",
          Authorization: access_token_withBearer,
        },
      }
    )
    .then(async (response) => {
      if (!response)
        return res.status(401).json({ msg: "User is not authorized" });

      const emailFromGoogle = response.data.emailAddresses[0].value;
      if (email !== emailFromGoogle)
        return res
          .status(401)
          .json({ msg: "Unauthorized! Invalid access token" });

      await leaderboardModel
        .findOne({ email: email })
        .then(async (leaderboardResponse) => {
          console.log(
            "The leaderboard data is:",
            leaderboardResponse.score,
            "and: ",
            score
          );
          if (!leaderboardResponse) {
            const leaderboardObject = new leaderboardModel({
              email: email,
              score: score + leaderboardResponse.score,
            });
            await leaderboardObject.save();
            return res.status(200).json({ score: score });
          }

          await leaderboardModel.findOneAndUpdate(
            { email: email },
            { score: score }
          );

          res.status(200).json({ score: score + leaderboardResponse.score });
        })
        .catch((err) => {
          console.log("Error occured in fetching score");
        });
    })
    .catch((err) => {
      console.log("Server error in fetching user details");
    });
});

module.exports = router;
