import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as deviceReducer } from '../sagas/device/reducer';
import { reducer as statisticsReducer } from '../sagas/statistics/reducer';

const reducers = combineReducers({
  device: deviceReducer,
  statistics: statisticsReducer,
  form: formReducer
})

export default reducers;
