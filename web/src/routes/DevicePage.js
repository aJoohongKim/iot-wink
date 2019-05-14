import React from 'react'
import Device from '../components/Device';
import LedButton from '../components/LedButton';

export default class DevicePage extends React.Component {
  render() {
    return <div><LedButton /><Device /></div>
  }
}
