import * as types from './types';

export const fetch_statistics_action = (queryParams) => {
  return {
    type: types.FETCH_LATEST_STATISTICS,
    payload: queryParams
  };
}
