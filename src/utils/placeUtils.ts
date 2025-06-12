export const getPredictedText = (suggestion: places.Suggestion) => {
  const text =
    "placePrediction" in suggestion
      ? suggestion.placePrediction.text.text
      : suggestion.queryPrediction.text.text;

  return text;
};
