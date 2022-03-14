exports.findPercentScore = (scoreClassValue, finalScoreValue) =>{
    return (((scoreClassValue+1) / (finalScoreValue + 1)) * 100).toFixed(2);
}