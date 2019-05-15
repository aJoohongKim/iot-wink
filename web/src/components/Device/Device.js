import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export default class HeaderComponent extends React.Component {
  static propTypes = {
    device: PropTypes.object,
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func
  }

  componentDidMount() {
    this.props.subscribe();
  }

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  render() {
    const { ledStatus, gyro, accel, temp, counter, rotation } = this.props.device

    return (
      <div>
        <Link to="/">Home</Link><br />
        <Paper style={style} zDepth={3}>
          LED status: {ledStatus ? 'ON': 'OFF'}<br />
          Temperature: {temp}<br />
          Counter: {counter}<br />
        </Paper><br />
        <Paper style={style} zDepth={3}>
          Gyro <br />x: {gyro.x}<br />y: {gyro.y}<br />z: {gyro.z}
        </Paper><br />
        <Paper style={style} zDepth={3}>
          Accelerometer <br />x: {accel.x}<br />y: {accel.y}<br />z: {accel.z}
        </Paper><br />
        <Paper style={style} zDepth={3}>
          Rotation <br />x: {rotation.x}<br />y: {rotation.y}
        </Paper>
      </div>
    )
  }
}
