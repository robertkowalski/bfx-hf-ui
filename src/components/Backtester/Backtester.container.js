import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import {
  getBacktestState, getBacktestData, getBacktestResults, getAuthToken,
} from '../../redux/selectors/ws'
import { getMarkets } from '../../redux/selectors/meta'

import Backtester from './Backtester'

const mapStateToProps = (state = {}) => ({
  backtest: getBacktestState(state),
  backtestData: getBacktestData(state),
  allMarkets: getMarkets(state),
  backtestResults: getBacktestResults(state),
  strategyContent: state.ui.content,
  backtestOptions: state.ws.backtest.backtestOptions || {},
  authToken: getAuthToken(state),
})

const mapDispatchToProps = dispatch => ({
  dsExecuteBacktest: (exchange, from, to, symbol, tf, candles, trades, strategy) => {
    dispatch(WSActions.purgeBacktestData())
    dispatch(WSActions.send([
      'exec.str', [exchange, from, to, symbol, tf, candles, trades, true, strategy],
    ]))
    dispatch(WSActions.setBacktestLoading())
  },
  setBacktestOptions: options => {
    dispatch(WSActions.setBacktestOptions(options))
  },
  savePairs: (pairs, authToken) => {
    dispatch(WSActions.send([
      'favourite_trading_pairs.save',
      authToken,
      pairs,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Backtester)
