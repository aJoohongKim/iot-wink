import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';
import WinkXYPlot from './WinkXYPlot';

const style = {
  margin: 12,
};

export default class ThreeLinesPlotComponent extends Component {
  static propTypes = {
    statistics: PropTypes.object,
    fetch_statistics: PropTypes.func,
  }
  
  componentDidMount() {
    this.props.fetch_statistics({
      clientId: 'client-id-1',
      event_at: '2019-05-14 18:13:00.000',
      limit: 60,
      scanIndexForward: false
    });
  }

  handle_refresh = () => {
    this.props.fetch_statistics({
      clientId: 'client-id-1',
      event_at: '2019-05-14 18:13:00.000',
      limit: 60,
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
    const { Items } = this.props.statistics;
    if (Items.length > 1) {
      const gyro_x = Items.map((item, idx) => {return {x: idx, y: parseFloat(item.gyro_x)}});
      const gyro_y = Items.map((item, idx) => {return {x: idx, y: parseFloat(item.gyro_y)}});
      const gyro_z = Items.map((item, idx) => {return {x: idx, y: parseFloat(item.gyro_z)}});

      const accel_x = Items.map((item, idx) => {return {x: idx, y: parseFloat(item.accel_x)}});
      const accel_y = Items.map((item, idx) => {return {x: idx, y: parseFloat(item.accel_y)}});
      const accel_z = Items.map((item, idx) => {return {x: idx, y: parseFloat(item.accel_z)}});

      return (
        <div>
          <Link to="/">Home</Link><br />
          <RaisedButton label="Refresh" primary={true} style={style} onClick={this.handle_refresh}/>
          <br/>
          <WinkXYPlot xLabel="Time" yLabel="Gyro" firstLine={gyro_x} secondLine={gyro_y} thirdLine={gyro_z} />
          <WinkXYPlot xLabel="Time" yLabel="Accelerometer" firstLine={accel_x} secondLine={accel_y} thirdLine={accel_z} />
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/">Home</Link><br />
          <RaisedButton label="Refresh" primary={true} style={style} onClick={this.handle_refresh}/>
          <br/>
        </div>
      );
    }
    
    
  }
}
