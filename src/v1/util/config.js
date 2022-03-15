module.exports = {
  find_percent_score: (score_class_value, final_score_value) => {
    return (((score_class_value + 1) / (final_score_value + 1)) * 100).toFixed(
      2
    );
  },
};
