import { connect } from 'react-redux'

import DeviceComponent from './Device'

import { subscribe_action, unsubscribe_action } from '../../sagas/device/actions'

const mapStatetoProps = state => {
  return {
    device: state.device
  }
}

const mapDispatchToProps = dispatch => {
  return {
    subscribe: () => {
      dispatch(subscribe_action())
    },
    unsubscribe: () => {
      dispatch(unsubscribe_action());
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(DeviceComponent)
