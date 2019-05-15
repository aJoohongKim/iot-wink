import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from './types'



const fetchLatestStatistics = ({clientId, event_at, limit, scanIndexForward}) => {
  return fetch(
    `https://l7smx4s0x3.execute-api.ap-northeast-2.amazonaws.com/dev/statistics?clientId=${clientId}&event_at=${event_at}&limit=${limit}&scanIndexForward=${scanIndexForward}`,
    )
    .then(res => res.json())
    .then(data => data)
    .catch((err) => {
      throw err;
    });
}

function* workerLatestStatistics(action) {
  try {
    const payload = yield call(fetchLatestStatistics, action.payload);
    yield put({type: types.FETCH_LATEST_STATISTICS_SUCCESS, payload});
  } catch (error) {
    console.log('FETCH_LATEST_STATISTICS_FAILURE', error);
    yield put({type: types.FETCH_LATEST_STATISTICS_FAILURE, payload: error});
  }
}

export default function* sagas() {
  yield takeLatest(types.FETCH_LATEST_STATISTICS, workerLatestStatistics);
}
