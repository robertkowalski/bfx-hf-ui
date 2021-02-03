import React from 'react'

import Switch from 'react-switch'

import MarketSelect from '../MarketSelect'
import ExchangeInfoBarItem from './ExchangeInfoBarItem'
import quotePrefix from '../../util/quote_prefix'

import { propTypes, defaultProps } from './ExchangeInfoBar.props'
import './style.css'

export default class ExchangeInfoBar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  componentDidMount() {
    const { activeExchange, activeMarket, addTickerRequirement } = this.props
    addTickerRequirement(activeExchange, activeMarket)
  }

  toggleTradingMode() {
    const { openTradingModeModal } = this.props
    openTradingModeModal()
  }

  favoriteSelect(pair, isAddition) {
    const { savePairs, authToken, favoritePairs = [] } = this.props
    if (isAddition) {
      savePairs([...favoritePairs, pair], authToken)
    } else {
      const filtredPairs = favoritePairs.filter(p => p !== pair)
      savePairs(filtredPairs, authToken)
    }
  }

  render() {
    const {
      onChangeMarket,
      activeMarket,
      ticker,
      activeExchange,
      markets,
      openNotifications,
      showTicker,
      showNotifications,
      showAddComponent,
      onAddComponent,
      showSave,
      onSave,
      favoritePairs,
      isPaperTrading,
      isTradingModeModalVisible,
    } = this.props
    const {
      lastPrice, dailyChange, dailyChangePerc, high, low, volume,
    } = ticker

    const marketsForActiveExchange = markets[activeExchange] || []

    return (
      <div className='hfui-exchangeinfobar__wrapper'>
        <div className='hfui-exchangeinfobar__left'>
          <ExchangeInfoBarItem
            label='Market'
            value={(
              <MarketSelect
                markets={marketsForActiveExchange}
                value={activeMarket}
                onFavoriteSelect={(pair, isFilled) => this.favoriteSelect(pair, isFilled)}
                favoritePairs={favoritePairs}
                onChange={(market) => {
                  onChangeMarket(activeExchange, market, activeMarket)
                }}
                renderWithFavorites
              />
            )}
          />
        </div>
        {(showTicker) && (
          <ul>
            <ExchangeInfoBarItem
              text
              vertical
              label='Last Price'
              value={lastPrice || '-'}
              valuePrefix={quotePrefix(activeMarket.quote)}
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Change'
              value={dailyChange || '-'}
              valuePrefix={quotePrefix(activeMarket.quote)}
              dataClassName={
                dailyChange
                  ? dailyChange < 0 ? 'hfui-red' : 'hfui-green'
                  : ''
              }
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Change %'
              valueSuffix='%'
              value={dailyChangePerc ? dailyChangePerc * 100 : '-'}
              dataClassName={
                dailyChangePerc
                  ? dailyChangePerc < 0 ? 'hfui-red' : 'hfui-green'
                  : ''
              }
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h High'
              valuePrefix={quotePrefix(activeMarket.quote)}
              value={high || '-'}
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Low'
              valuePrefix={quotePrefix(activeMarket.quote)}
              value={low || '-'}
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Volume'
              value={volume || '-'}
            />
          </ul>
        )}

        <div className='hfui-exchangeinfobar__right'>
          <div className='hfui-tradingpaper__control'>
            <div className='hfui-tradingpaper__control-toggle'>
              <p>Paper Trading</p>
              <Switch
                checked={isPaperTrading}
                onChange={() => this.toggleTradingMode()}
                disabled={isTradingModeModalVisible}
                onColor='#54B361'
                offColor='#d8d8d8'
                height={21}
                width={35}
              />
            </div>
            <div className='hfui-tradingpaper__control-refill'>
              <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M0.705833 13.75C0.495917 13.75 0.306167 13.6052 0.2585 13.3916C0.0870833 12.6298 0 11.8241 0 11C0 4.93442 4.93442 0 11 0C14.4833 0 17.7907 1.6775 19.8486 4.48708C19.998 4.6915 19.954 4.97842 19.7505 5.12783C19.5443 5.27725 19.2583 5.23325 19.1098 5.02883C17.2233 2.45392 14.1918 0.916667 11 0.916667C5.44042 0.916667 0.916667 5.44042 0.916667 11C0.916667 11.7572 0.996417 12.4942 1.15317 13.1918C1.20908 13.4383 1.05325 13.684 0.80575 13.739C0.771833 13.7463 0.738833 13.75 0.705833 13.75Z' fill='white' />
                <path d='M11 22C7.51667 22 4.20934 20.3225 2.15142 17.5129C2.002 17.3085 2.046 17.0216 2.2495 16.8722C2.45484 16.7218 2.73992 16.7658 2.89025 16.9712C4.77675 19.5461 7.80817 21.0833 11 21.0833C16.5596 21.0833 21.0833 16.5596 21.0833 11C21.0833 10.2309 21.0008 9.49574 20.8386 8.81465C20.7799 8.56807 20.9321 8.32149 21.1778 8.26282C21.4271 8.20415 21.6718 8.35632 21.7305 8.6029C21.9093 9.35274 22 10.1594 22 11C22 17.0656 17.0656 22 11 22Z' fill='white' />
                <path d='M2.3375 20.1667C2.08817 20.1667 1.88375 19.9668 1.87917 19.7157L1.83333 16.9657C1.8315 16.8428 1.87917 16.7246 1.96533 16.6366C2.0515 16.5486 2.16883 16.5 2.29167 16.5H5.04167C5.29467 16.5 5.5 16.7053 5.5 16.9583C5.5 17.2113 5.29467 17.4167 5.04167 17.4167H2.75825L2.79583 19.701C2.80042 19.954 2.59783 20.1621 2.34483 20.1667C2.343 20.1667 2.34025 20.1667 2.3375 20.1667Z' fill='white' />
                <path d='M19.7083 5.49997H16.9583C16.7053 5.49997 16.5 5.29464 16.5 5.04164C16.5 4.78864 16.7053 4.58331 16.9583 4.58331H19.25V2.29165C19.25 2.03865 19.4553 1.83331 19.7083 1.83331C19.9613 1.83331 20.1667 2.03865 20.1667 2.29165V5.04164C20.1667 5.29464 19.9613 5.49997 19.7083 5.49997Z' fill='white' />
                <path d='M11 15.5834C7.65876 15.5834 5.04167 14.1735 5.04167 12.375V9.62502C5.04167 9.37202 5.24701 9.16669 5.50001 9.16669C5.75301 9.16669 5.95834 9.37202 5.95834 9.62502V12.375C5.95834 13.4594 8.02909 14.6667 11 14.6667C13.9709 14.6667 16.0417 13.4594 16.0417 12.375V9.62502C16.0417 9.37202 16.247 9.16669 16.5 9.16669C16.753 9.16669 16.9583 9.37202 16.9583 9.62502V12.375C16.9583 14.1735 14.3413 15.5834 11 15.5834Z' fill='white' />
                <path d='M11 12.8334C7.65876 12.8334 5.04167 11.4235 5.04167 9.62502C5.04167 7.82652 7.65876 6.41669 11 6.41669C14.3413 6.41669 16.9583 7.82652 16.9583 9.62502C16.9583 11.4235 14.3413 12.8334 11 12.8334ZM11 7.33335C8.02909 7.33335 5.95834 8.5406 5.95834 9.62502C5.95834 10.7094 8.02909 11.9167 11 11.9167C13.9709 11.9167 16.0417 10.7094 16.0417 9.62502C16.0417 8.5406 13.9709 7.33335 11 7.33335Z' fill='white' />
              </svg>
            </div>
          </div>
        </div>

        {(showSave) && (
          <div className='hfui-exchangeinfobar__right' onClick={onSave}>
            <i className='icon-save' />
          </div>
        )}

        {(showAddComponent) && (
          <div className='hfui-exchangeinfobar__right' onClick={onAddComponent}>
            <i className='icon-plus' />
          </div>
        )}

        {(showNotifications) && (
          <div className='hfui-exchangeinfobar__right' onClick={openNotifications}>
            <i className='icon-notifications' />
          </div>
        )}
      </div>
    )
  }
}
