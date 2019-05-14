import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as deviceReducer } from '../sagas/device/reducer';

const reducers = combineReducers({
  device: deviceReducer,
  form: formReducer
})

export default reducers
