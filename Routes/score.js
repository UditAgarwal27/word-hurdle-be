const router = require('express').Router();
const scoreModel = require('../Models/score');

const {update_score_one_class, update_score_two_class, update_score_three_class, update_score_four_class, update_score_five_class, update_score_six_class, update_score_seven_class, update_score_eight_class }= require('../Services/database');
const {findPercentScore} = require('../Services/score');

router.post("/new", async(req, res)=>{
    const user = new scoreModel();
    user.save();
})

router.post("/dailyScore", async (req, res) => {
    const data = req.body;
    const noOfAttempts = data.attempts;

    var finalScore = 0;
    var percentScore = 0;

    await scoreModel.findOne()
    .then(score=>{
        finalScore = score.scoreOne + score.scoreTwo + score.scoreThree + score.scoreFour + score.scoreFive + score.scoreSix + score.scoreSeven + score.scoreEight;
        switch(noOfAttempts) { 
            case 1:
                update_score_one_class(score.scoreOne);
                percentScore = findPercentScore(score.scoreOne, finalScore);
                break;
            case 2:
                update_score_two_class(score.scoreTwo);
                percentScore = findPercentScore(score.scoreTwo, finalScore);
                break;
            case 3:
                update_score_three_class(score.scoreThree);
                percentScore = findPercentScore(score.scoreThree, finalScore);
                break;
            case 4:
                update_score_four_class(score.scoreFour);
                percentScore = findPercentScore(score.scoreFour, finalScore);
                break;
            case 5:
                update_score_five_class(score.scoreFive);
                percentScore = findPercentScore(score.scoreFive, finalScore);
                break;
            case 6:
                update_score_six_class(score.scoreSix);
                percentScore = findPercentScore(score.scoreSix, finalScore);
                break;
            case 7:
                update_score_seven_class(score.scoreSeven);
                percentScore = findPercentScore(score.scoreSeven, finalScore);
                break;
            case 8:
                update_score_eight_class(score.scoreEight);
                percentScore = findPercentScore(score.scoreEight, finalScore);
                break;
        }

    })
    res.status(200).json({percentScore: percentScore});
})


module.exports = router;