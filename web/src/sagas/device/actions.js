import * as types from './types';

export const subscribe_action = () => {
  return {
    type: types.BEGIN_SUBSCRIBE,
    payload: {}
  };
}

export const unsubscribe_action = () => {
  return {
    type: types.END_SUBSCRIBE,
    payload: {}
  };
}

export const publish_led_on_action = () => {
  return {
    type: types.PUBLISH_LED_ON,
    payload: {}
  };
}

export const publish_led_off_action = () => {
  return {
    type: types.PUBLISH_LED_OFF,
    payload: {}
  };
}
