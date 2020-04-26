import * as types from '../actionTypes';

const initialState = {
  isProcessing: false,
  doneProcessing: false,
  numImagesToAnalyze: 0,
  results: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_SCORES:
      const numImagesToAnalyze = action.numImagesToAnalyze || state.numImagesToAnalyze
      return {
        results: action.scores,
        numImagesToAnalyze,
        isProcessing: action.scores.length !== numImagesToAnalyze,
        doneProcessing: action.scores.length === numImagesToAnalyze
      };
    case types.CLEAR_SCORES:
      return initialState;
    default:
      return state;
  }
}
