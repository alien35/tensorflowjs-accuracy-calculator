import * as types from '../actionTypes';

export const setScores = (scores, numImagesToAnalyze) => {
    return {
        type: types.SET_SCORES,
        scores,
        numImagesToAnalyze
    };
};
