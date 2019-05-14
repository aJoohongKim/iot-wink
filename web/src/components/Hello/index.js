import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Hello extends Component {
  render() {
    return <div><h1>Site Tracker Web</h1>
      <Link to="/device/">Device</Link>
    </div>;
  }
}

export default Hello
