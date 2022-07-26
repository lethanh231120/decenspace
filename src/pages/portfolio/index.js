import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import './styles.scss'
import WalletAddress from '../../components/portfolio/WalletAddress'
import Analyst from '../../components/portfolio/Analyst'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { getAllHoldingBtc } from '../../redux/bitcoinSlice'
import { getAllHoldingEvm } from '../../redux/evmSlice'
import { SUCCESS_DELETE_CONNECTION_EVM, SUCCESS_DELETE_CONNECTION } from '../../constants/StatusMessageConstants'
// import { get } from '../../api/coinPriceService'
import { getPriceCoinByPeriod } from '../../redux/coinsPriceSlice'

const Portfolio = () => {
  const [connectionName, setConnectionName] = useState('all')
  const [dataConnection, setDataConnection] = useState([])
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [params, setParams] = useState({ coinId: 'bitcoin', time: '1d' })
  const [holdingAll, setHoldingAll] = useState([])
  const dispatch = useDispatch()
  const { holding_btc, status_btc } = useSelector(state => state.connectionBtc)
  const { holding_evm, status_evm } = useSelector(state => state.connectionEvm)
  const { data_coin_price } = useSelector(state => state.coinPrice)

  useEffect(() => {
    dispatch(getAllHoldingBtc())
  }, [dispatch, isModalEdit, status_btc === SUCCESS_DELETE_CONNECTION])

  useEffect(() => {
    dispatch(getAllHoldingEvm())
  }, [dispatch, status_evm === SUCCESS_DELETE_CONNECTION_EVM])

  useEffect(() => {
    setHoldingAll([
      ...holding_btc,
      ...holding_evm
    ])
  }, [holding_btc, holding_evm])

  useEffect(() => {
    dispatch(getPriceCoinByPeriod(params))
  }, [params])

  useEffect(() => {
    if (connectionName !== 'all') {
      setDataConnection(holdingAll && holdingAll?.filter((item) => item.connection.id === parseInt(connectionName)))
    } else {
      const allHolding = []
      holdingAll.map((item) => allHolding.push(...item.holdings))
      setDataConnection([
        {
          holdings: allHolding
        }
      ])
    }
  }, [connectionName, holdingAll])

  const handleTabClick = (e) => {
    setConnectionName(e)
  }

  return (
    <div>
      <Row>
        <Col span={6}>
          <WalletAddress
            connectionName={connectionName}
            holding_evm={holdingAll.length > 0 && holdingAll}
            status_evm={status_evm}
            setIsModalEdit={setIsModalEdit}
            isModalEdit={isModalEdit}
            handleTabClick={handleTabClick}
          />
        </Col>
        <Col span={18}>
          <Analyst
            status={status_btc}
            setParams={setParams}
            params={params}
            data_coin_price={data_coin_price}
            dataConnection={!_.isEmpty(dataConnection) && dataConnection}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Portfolio
