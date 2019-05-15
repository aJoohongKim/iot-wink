import * as types from './types';

let initialState = {
  Items: [],
  Count: 0,
  ScannedCount: 0,
  LastEvaluatedKey: {
    event_at: '',
    clientId: ''
  },
  error: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LATEST_STATISTICS_SUCCESS:
      return {...state, ...action.payload};
    case types.FETCH_LATEST_STATISTICS_FAILURE:
      return state.error = action.payload;
    default:
      return state;
  }
}
