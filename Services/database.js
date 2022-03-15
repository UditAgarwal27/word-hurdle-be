const scoreModel = require('../Models/score');

exports.update_score_class= async(attempts,score)=>{
    let curr_score_class = "score"+attempts;
    let scoreValue = score[curr_score_class];
    let update_doc = {};
    update_doc[`${curr_score_class}`] = scoreValue + 1 ; 
    await scoreModel.findOneAndUpdate ({scoreName :"DailyScore"}, update_doc , {new:true})
    .then((updatesScore)=>{
        console.log(`Score class ${curr_score_class} has been incremented from ${scoreValue} to ${scoreValue + 1}`);
    })
    .catch(err=>{
        console.log(err);
    })
}