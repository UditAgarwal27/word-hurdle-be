const router = require('express').Router();
const scoreModel = require('../Models/score');

const {update_score_class }= require('../Services/database');
const {findPercentScore} = require('../Services/score');

router.post("/new", async(req, res)=>{
    const newScoreModel = new scoreModel();
    newScoreModel.save();
    return true;
})

router.post("/dailyScore", async (req, res) => {
    const data = req.body;
    const noOfAttempts = data.attempts;

    var finalScore = 0;
    var percentScore = 0;

    await scoreModel.findOne()
    .then(score=>{
        finalScore = score.score1 + score.score2 + score.score3 + score.score4 + score.score5 + score.score6 + score.score7 + score.score8;
        update_score_class(noOfAttempts, score);
        percentScore = findPercentScore(noOfAttempts, score, finalScore);
    })
    res.status(200).json({percentScore: percentScore});
})


module.exports = router;