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

const Portfolio = () => {
  const [connectionName, setConnectionName] = useState('all')
  const [dataConnection, setDataConnection] = useState([])
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [params, setParams] = useState({ coinId: 'bitcoin', time: '1d' })

  const dispatch = useDispatch()
  const { status_btc } = useSelector(state => state.connectionBtc)
  const { holding_evm, status_evm } = useSelector(state => state.connectionEvm)

  useEffect(() => {
    dispatch(getAllHoldingBtc())
  }, [dispatch, isModalEdit, status_btc === SUCCESS_DELETE_CONNECTION])

  useEffect(() => {
    dispatch(getAllHoldingEvm())
  }, [dispatch, status_evm === SUCCESS_DELETE_CONNECTION_EVM])

  useEffect(() => {
    const getData = async() => {
      // await get(`price/${params.coinId}/period?time=${params.time}`).then(res => console.log(res.data)).catch(error => error)
    }
    getData()
  }, [params])

  useEffect(() => {
    if (connectionName !== 'all') {
      setDataConnection(holding_evm && holding_evm?.filter((item) => item.connection.id === parseInt(connectionName)))
    } else {
      const allHolding = []
      holding_evm.map((item) => allHolding.push(...item.holdings))
      setDataConnection([
        {
          holdings: allHolding
        }
      ])
    }
  }, [connectionName, holding_evm])

  const handleTabClick = (e) => {
    setConnectionName(e)
  }

  return (
    <div>
      <Row>
        <Col span={6}>
          <WalletAddress
            connectionName={connectionName}
            holding_evm={holding_evm.length > 0 && holding_evm}
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
            dataConnection={!_.isEmpty(dataConnection) && dataConnection}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Portfolio
