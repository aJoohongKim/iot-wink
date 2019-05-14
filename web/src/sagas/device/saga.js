import { call, put, takeLatest, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Amplify from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

import * as types from './types'


let sub_topic_2 = null;

function initSubscribe() {
  return eventChannel(emitter => {
    Amplify.configure({
      Auth: {
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
      }
    });
    
    Amplify.addPluggable(new AWSIoTProvider({
      aws_pubsub_region: process.env.REACT_APP_REGION,
      aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`,
    }));
    
    sub_topic_2 = Amplify.PubSub.subscribe('topic_2').subscribe({
      next: data => {
        // console.log(data);
        if (data.value.payload) {
          return emitter({type: types.ON_SUBSCRIBE_NEXT, payload: data.value.payload});
        } else {
          console.log('abnormal data format', data.value);
        }
      },
      error: error => {
        console.error(error);
        return emitter({type: types.ON_SUBSCRIBE_ERROR, payload: {}});
      },
      close: () => console.log('Done'),
    });

    return () => {
      // sub_topic_2.unsubscribe();
      console.log('unsubscribe from topic')
    }
  })
}

function *begin_subscribe(action) {
  const channel = yield call(initSubscribe);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function end_subscribe() {
  if (sub_topic_2) {
    sub_topic_2.unsubscribe();
  }
}


function* publish_led_on() {
  Amplify.configure({
    Auth: {
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      region: process.env.REACT_APP_REGION,
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
    }
  });
  
  Amplify.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: process.env.REACT_APP_REGION,
    aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`,
  }));

  yield Amplify.PubSub.publish('commands/client-id-1/led', { cmd: 'ON' });
}

function* publish_led_off() {
  Amplify.configure({
    Auth: {
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      region: process.env.REACT_APP_REGION,
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
    }
  });
  
  Amplify.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: process.env.REACT_APP_REGION,
    aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`,
  }));
  
  yield Amplify.PubSub.publish('commands/client-id-1/led', { cmd: 'OFF' });
}

export default function* sagas() {
  yield takeLatest(types.PUBLISH_LED_ON, publish_led_on);
  yield takeLatest(types.PUBLISH_LED_OFF, publish_led_off);
  yield takeLatest(types.BEGIN_SUBSCRIBE, begin_subscribe);
  yield takeLatest(types.END_SUBSCRIBE, end_subscribe);
}
