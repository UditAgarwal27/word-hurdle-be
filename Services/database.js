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

exports.reset_daily_score = async()=>{
    const update_body = {
        $set:{
            "score1":0, 
            "score2":0,
            "score3":0,
            "score4":0,
            "score5":0,
            "score6":0,
            "score7":0,
            "score8":0
        }
    }
    scoreModel.findOneAndUpdate({"scoreName":"DailyScore"}, update_body, {new:true} )
    .then(()=>{
        console.log("Resetting daily score to default values");
    })
    .catch(err=>{
        console.log(err);
    })
}