exports.findPercentScore = (attempts, score, finalScoreValue) =>{
    let curr_score_class = "score"+attempts;
    let scoreValue = score[curr_score_class];
    return (((scoreValue+1) / (finalScoreValue + 1)) * 100).toFixed(2);
}