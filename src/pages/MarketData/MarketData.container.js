import { connect } from 'react-redux'
import {
  getLayouts, getActiveMarket, getActiveExchange, getFirstLogin,
} from '../../redux/selectors/ui'
import { MARKET_PAGE } from '../../redux/constants/ui'
import UIActions from '../../redux/actions/ui'

import MarketData from './MarketData'

const mapStateToProps = (state = {}) => ({
  layouts: getLayouts(state),
  activeMarket: getActiveMarket(state),
  exID: getActiveExchange(state),
  firstLogin: getFirstLogin(state),
  isGuideActive: state.ui[`${MARKET_PAGE}_GUIDE_ACTIVE`],

})

const mapDispatchToProps = dispatch => ({
  saveLayout: (layout, id) => {
    dispatch(UIActions.saveLayout(layout, id))
  },

  createLayout: (id) => {
    dispatch(UIActions.createLayout(id))
  },

  deleteLayout: (id) => {
    dispatch(UIActions.deleteLayout(id))
  },

  finishGuide() {
    dispatch(UIActions.finishGuide(MARKET_PAGE))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(MarketData)
