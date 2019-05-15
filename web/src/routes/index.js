import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from './HomePage';
import DevicePage from './DevicePage';
import StatisticsPage from './StatisticsPage';
import ThreeLinesPlotPage from './ThreeLinesPlotPage';

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/device" component={DevicePage} />
            <Route path="/stat" component={StatisticsPage} />
            <Route path="/graph" component={ThreeLinesPlotPage} />
          </Switch>
        </Router>
      </div>
    )
  }
}
