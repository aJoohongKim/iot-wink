import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Routes from './routes'
import Amplify from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

import './App.css'

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

Amplify.PubSub.subscribe('topic_2').subscribe({
  next: data => console.log('Message received', data),
  error: error => console.error(error),
  close: () => console.log('Done'),
});

class App extends Component {
  static propTypes = {
    init: PropTypes.func
  }

  render() {
    this.props.init()

    return (
      <div className="App">
        <Routes />
      </div>
    )
  }
}

export default App
