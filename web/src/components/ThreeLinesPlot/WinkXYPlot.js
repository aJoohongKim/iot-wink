import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';

export default class WinkXYPlot extends Component {
  static propTypes = {
    firstLine: PropTypes.array,
    secondLine: PropTypes.array,
    thirdLine: PropTypes.array,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
  }
  
  getRandomData() {
  const randomYData = [...new Array(100)].map(() =>
      Math.round(Math.random() * 40)
  );
  return randomYData.map((val, idx) => {
      return {x: idx, y: val};
  });
  }
  
  render() {
    const {firstLine, secondLine, thirdLine, xLabel, yLabel} = this.props;

    return (
      <div style={{display: 'flex'}}>
        <XYPlot width={600} height={300}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis title={xLabel} />
          <YAxis title={yLabel} />
          <LineSeries className="first-series" data={firstLine} />
          <LineSeries className="second-series" data={secondLine} />
          <LineSeries className="third-series" data={thirdLine} />
        </XYPlot>
      </div>
    )
  }
}
