import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

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
    const { ledStatus, gyro } = this.props.device

    return (
      <div>
        <Link to="/">Home</Link><br />
        LED is currently {ledStatus}<br />
        gyro: {JSON.stringify(gyro, null, 2)}
      </div>
    )
  }
}
