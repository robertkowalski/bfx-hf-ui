import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import _differenceBy from 'lodash/differenceBy'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

import AlgoOrdersTable from './ActiveAlgoOrdersModal.table'

import './style.css'

const ActiveAlgoOrdersModal = ({
  activeAlgoOrders,
  handleActiveOrders,
}) => {
  const [ordersList, setOrdersList] = useState([])
  const [selectedOrders, setSelectedOrders] = useState([])

  useEffect(() => {
    setOrdersList(activeAlgoOrders)
  }, [])

  const onOrderSelect = (e, gid, algoID) => {
    if (e) {
      setSelectedOrders([...selectedOrders, { gid, algoID }])
    } else {
      setSelectedOrders([...(selectedOrders.filter(order => gid !== order.gid))])
    }
  }

  const onAllOrdersSelect = (e) => {
    let allOrders = []
    if (e) {
      ordersList.forEach(order => {
        const { gid, algoID } = order
        allOrders.push({ gid, algoID })
      })
    } else {
      allOrders = []
    }
    setSelectedOrders(allOrders)
  }

  const isOrderSelected = (gid) => {
    const gids = []
    selectedOrders.forEach(order => gids.push(order.gid))
    return gids.includes(gid)
  }

  const isAllOrdersSelected = () => {
    const allOrders = []
    ordersList.forEach(order => {
      const { gid, algoID } = order
      allOrders.push({ gid, algoID })
    })
    return _isEqual(allOrders, selectedOrders)
  }

  const prepareOrders = (orders) => {
    const preparedOrders = []
    orders.forEach(order => {
      const { gid, algoID } = order
      preparedOrders.push({ gid, algoID })
    })
    return preparedOrders
  }

  const onSubmit = (type) => {
    const ordersLeft = _differenceBy(ordersList, selectedOrders, 'gid')
    const allOrders = prepareOrders(ordersList)
    const unselectedOrders = prepareOrders(ordersLeft)
    handleActiveOrders({
      type,
      allOrders,
      selectedOrders,
      unselectedOrders,
    })
  }

  return (
    <Modal
      onClose={() => onSubmit('cancel_all')}
      label='Active Orders'
      className='hfui-active-ao-modal__wrapper'
      actions={[(
        <Button
          green
          key='orders_cancel'
          onClick={() => onSubmit('cancel_all')}
          className='hfui-active-ao-modal-btn mr-10'
          label={[
            <p key='text'>Cancel All</p>,
          ]}
        />
      ), (
        <Button
          green
          key='orders_resume'
          onClick={() => onSubmit('resume')}
          disabled={_isEmpty(selectedOrders)}
          className='hfui-active-ao-modal-btn'
          label={[
            <p key='text'>Resume</p>,
          ]}
        />
      )]}
    >
      <AlgoOrdersTable
        orders={ordersList}
        onOrderSelect={onOrderSelect}
        onAllOrdersSelect={onAllOrdersSelect}
        isOrderSelected={isOrderSelected}
        isAllOrdersSelected={isAllOrdersSelected}
      />
    </Modal>
  )
}

ActiveAlgoOrdersModal.propTypes = {
  handleActiveOrders: PropTypes.func.isRequired,
  activeAlgoOrders: PropTypes.arrayOf(PropTypes.object),
}

ActiveAlgoOrdersModal.defaultProps = {
  activeAlgoOrders: [],
}

export default React.memo(ActiveAlgoOrdersModal)
