import { combineReducers } from 'redux';
import selectFromReducer from '../slices/selectFromSlice';
import selectToReducer from '../slices/selectToSlice';
import priceRateFromReducer from '../slices/priceRateFromSlice';
import priceRateToReducer from '../slices/priceRateToSlice';

const rootReducer = combineReducers({
  selectFrom: selectFromReducer,
  selectTo: selectToReducer,
  priceRateFrom: priceRateFromReducer,
  priceRateTo: priceRateToReducer,
});

export default rootReducer;
