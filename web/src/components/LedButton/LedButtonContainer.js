import { connect } from 'react-redux'

import LedButtonComponent from './LedButton'

import { publish_led_on_action, publish_led_off_action } from '../../sagas/device/actions';

const mapStatetoProps = state => {
  return {
    device: state.device
  }
}

const mapDispatchToProps = dispatch => {
  return {
    turn_on: () => {
      dispatch(publish_led_on_action())
    },
    turn_off: () => {
      dispatch(publish_led_off_action());
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(LedButtonComponent)
