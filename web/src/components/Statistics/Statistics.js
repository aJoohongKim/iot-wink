import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import RaisedButton from 'material-ui/RaisedButton';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


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
   renderItemInTable = (items) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Time</TableHeaderColumn>
          <TableHeaderColumn>Gyro</TableHeaderColumn>
          <TableHeaderColumn>Accelerometer</TableHeaderColumn>
          <TableHeaderColumn>Rotation</TableHeaderColumn>
          <TableHeaderColumn>Temperature</TableHeaderColumn>
          <TableHeaderColumn>Counter</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
      {
        items.map((item) => {return (
          <TableRow key={item.event_at}>
            <TableRowColumn>{item.event_at}</TableRowColumn>
            <TableRowColumn>x: {item.gyro_x}<br />y: {item.gyro_y}<br />z: {item.gyro_z}</TableRowColumn>
            <TableRowColumn>x: {item.accel_x}<br />y: {item.accel_y}<br />z: {item.accel_z}</TableRowColumn>
            <TableRowColumn>x: {item.rotation_x}<br />y: {item.rotation_y}</TableRowColumn>
            <TableRowColumn>{item.avgTemp}</TableRowColumn>
            <TableRowColumn>{item.counter}</TableRowColumn>
          </TableRow>
        )})
      }
      </TableBody>
    </Table>
  );

  render() {
    const { Items } = this.props.statistics
    return (
      <div>
        <Link to="/">Home</Link><br />
        <RaisedButton label="Refresh" primary={true} style={style} onClick={this.handle_refresh}/>
        <br/>
        {this.renderItemInTable(Items)}
      </div>
    )
  }
}
