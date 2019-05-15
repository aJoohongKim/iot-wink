import * as types from './types';
import moment from 'moment';

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
      const nextState = {...state, ...action.payload};
      nextState.Items = nextState.Items.map((item) => {
        const utcTime = moment.utc(item.event_at).toDate();
        item.event_at = moment(utcTime).format('YYYY-MM-DD HH:mm:ss.sss');
        return item;
      });
      return nextState;
      // return {...state, ...action.payload};
    case types.FETCH_LATEST_STATISTICS_FAILURE:
      return state.error = action.payload;
    default:
      return state;
  }
}
