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
      return {
        results: action.scores,
        numImagesToAnalyze: action.numImagesToAnalyze,
        isProcessing: action.scores.length !== action.numImagesToAnalyze,
        doneProcessing: action.scores.length === action.numImagesToAnalyze
      };
    case types.CLEAR_SCORES:
      return initialState;
    default:
      return state;
  }
}
