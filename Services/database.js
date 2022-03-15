const scoreModel = require('../Models/score');

exports.update_score_one_class = async (scoreValue) =>{
    
    await scoreModel.findOneAndUpdate ({scoreName :"DailyScore"}, {"scoreOne": scoreValue +1}, {new:true})
    .then((updatesScore)=>{
        console.log(`Score class ScoreOne has been incremented from ${scoreValue} to ${scoreValue + 1}`);
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.update_score_two_class = async (scoreValue) =>{
    
    await scoreModel.findOneAndUpdate ({scoreName :"DailyScore"}, {"scoreTwo": scoreValue +1}, {new:true})
    .then((updatesScore)=>{
        console.log(`Score class ScoreTwo has been incremented from ${scoreValue} to ${scoreValue + 1}`);
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.update_score_three_class = async (scoreValue) =>{
    
    await scoreModel.findOneAndUpdate ({scoreName :"DailyScore"}, {"scoreThree": scoreValue +1}, {new:true})
    .then((updatesScore)=>{
        console.log(`Score class ScoreThree has been incremented from ${scoreValue} to ${scoreValue + 1}`);
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.update_score_four_class = async (scoreValue) =>{
    
    await scoreModel.findOneAndUpdate ({scoreName :"DailyScore"}, {"scoreFour": scoreValue +1}, {new:true})
    .then((updatesScore)=>{
        console.log(`Score class ScoreFour has been incremented from ${scoreValue} to ${scoreValue + 1}`);
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.update_score_five_class = async (scoreValue) =>{
    
    await scoreModel.findOneAndUpdate ({scoreName :"DailyScore"}, {"scoreFive": scoreValue +1}, {new:true})
    .then((updatesScore)=>{
        console.log(`Score class ScoreFive has been incremented from ${scoreValue} to ${scoreValue + 1}`);
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.update_score_six_class = async (scoreValue) =>{
    
    await scoreModel.findOneAndUpdate ({scoreName :"DailyScore"}, {"scoreSix": scoreValue +1}, {new:true})
    .then((updatesScore)=>{
        console.log(`Score class ScoreSix has been incremented from ${scoreValue} to ${scoreValue + 1}`);
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.update_score_seven_class = async (scoreValue) =>{
    
    await scoreModel.findOneAndUpdate ({scoreName :"DailyScore"}, {"scoreSeven": scoreValue +1}, {new:true})
    .then((updatesScore)=>{
        console.log(`Score class ScoreSeven has been incremented from ${scoreValue} to ${scoreValue + 1}`);
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.update_score_eight_class = async (scoreValue) =>{
    
    await scoreModel.findOneAndUpdate ({scoreName :"DailyScore"}, {"scoreEight": scoreValue +1}, {new:true})
    .then((updatesScore)=>{
        console.log(`Score class ScoreEight has been incremented from ${scoreValue} to ${scoreValue + 1}`);
    })
    .catch(err=>{
        console.log(err);
    })
}