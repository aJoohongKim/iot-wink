import { all, fork } from 'redux-saga/effects'

import deviceSaga from './device/saga';
import statisticsSaga from './statistics/saga';

export default function* root() {
  yield all([fork(deviceSaga), fork(statisticsSaga)]);
}
