import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

export default class StatisticsComponent extends Component {
  static propTypes = {
    statistics: PropTypes.object,
    fetch_statistics: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetch_statistics({
      clientId: 'client-id-1',
      event_at: '2019-05-14 18:13:00.000',
      limit: 30,
      scanIndexForward: false
    });
  }

  handle_refresh = () => {
    this.props.fetch_statistics({
      clientId: 'client-id-1',
      event_at: '2019-05-14 18:13:00.000',
      limit: 30,
      scanIndexForward: false
    });
  }

  // handle_demo = () => {
  //   this.props.fetch_statistics({
  //     clientId: 'client-id-1',
  //     event_at: '2019-05-14 18:13:00.000',
  //     limit: 30,
  //     scanIndexForward: true
  //   });
  // }

  render() {
    const { Items } = this.props.statistics
    return (
      <div>
        <Link to="/">Home</Link><br />
        <RaisedButton label="Refresh" primary={true} style={style} onClick={this.handle_refresh}/>
        <br/>
        <code>
            {JSON.stringify(Items, null, 2)}
        </code>
      </div>
    )
  }
}
