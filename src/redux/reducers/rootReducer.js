import { combineReducers } from 'redux';
import scores from './scores.reducer';

const rootReducer = combineReducers({
  scores
})
export default rootReducer;
