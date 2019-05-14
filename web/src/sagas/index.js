import { all, fork } from 'redux-saga/effects'

import deviceSaga from './device/saga';

export default function* root() {
  yield all([fork(deviceSaga)]);
}
