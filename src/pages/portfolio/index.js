import React, { useState } from 'react'
import { Row, Col } from 'antd'
import './styles.scss'
import WalletAddress from '../../components/portfolio/WalletAddress'
import Analyst from '../../components/portfolio/Analyst'
import { useSelector } from 'react-redux'
// import axios from 'axios'

const Portfolio = () => {
  const [connectionName, setConnectionName] = useState()
  const [params, setParams] = useState({ coinId: 'bitcoin', time: '1d' })
  const { list_connection, status } = useSelector(state => state.connections)
  console.log(params, connectionName)

  // useEffect(() => {
  //   axios.get(`bitcoinPrice/price/${params.coinId}/period?time=${params.time}`).then(res => console.log(res)).catch(error => error)
  // }, [params])

  return (
    <div>
      <Row>
        <Col span={6}>
          <WalletAddress
            list_connection={list_connection}
            status={status}
            setConnectionName={setConnectionName}
          />
        </Col>
        <Col span={18}>
          <Analyst
            status={status}
            setParams={setParams}
            params={params}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Portfolio
