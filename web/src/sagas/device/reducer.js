import * as types from './types';

let initialState = {
  accel: {
    x: 0.0,
    y: 0.0,
    z: 0.0
  },
  gyro: {
    x: 0.0,
    y: 0.0,
    z: 0.0
  },
  rotation: {
    x: 0.0,
    y: 0.0
  },
  temp: 0.0,
  ledStatus: 0,
  counter: 0
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ON_SUBSCRIBE_NEXT:
      return action.payload;
    case types.ON_SUBSCRIBE_ERROR:
      return initialState;
    default:
      return state;
  }
}
