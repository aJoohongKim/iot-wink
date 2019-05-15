import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};


export default class LedButtonComponent extends React.Component {
  static propTypes = {
    device: PropTypes.object,
    turn_on: PropTypes.func,
    turn_off: PropTypes.func
  };

  handle_onclick = (event) => {
    const { device: {ledStatus}, turn_on, turn_off } = this.props;
    if (ledStatus === 0) {
      turn_on();
    } else {
      turn_off();
    }
    
  };

  render() {
    const { ledStatus } = this.props.device;
    const labelText = ledStatus === 0 ? 'Turn LED On' : 'Turn LED Off';

    return <RaisedButton label={labelText} primary={true} style={style} onClick={this.handle_onclick}/>;
  }
}

