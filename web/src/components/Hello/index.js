import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Hello extends Component {
  render() {
    return <div><h1>IoT Wink Web</h1>
    <ul>
      <li><Link to="/device">Device</Link></li>
      <li><Link to="/stat">Statistics</Link></li>
      <li><Link to="/graph">Graph</Link></li>
    </ul>
    </div>;
  }
}

export default Hello
