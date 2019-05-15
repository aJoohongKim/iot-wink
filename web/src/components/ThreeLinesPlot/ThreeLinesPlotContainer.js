import { connect } from 'react-redux'

import ThreeLinesPlotComponent from './ThreeLinesPlot'

import { fetch_statistics_action } from '../../sagas/statistics/actions'

const mapStatetoProps = state => {
  return {
    statistics: state.statistics
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetch_statistics: (params) => {
      dispatch(fetch_statistics_action(params));
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ThreeLinesPlotComponent)
