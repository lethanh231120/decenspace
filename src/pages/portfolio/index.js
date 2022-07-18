import React from 'react'
import { Row, Col } from 'antd'
import './styles.scss'
import WalletAddress from '../../components/portfolio/WalletAddress'
import Analyst from '../../components/portfolio/Analyst'
import { useSelector } from 'react-redux'
const Portfolio = () => {
  const { list_connection, status } = useSelector(state => state.connections)
  return (
    <div>
      <Row>
        <Col span={6}>
          <WalletAddress
            list_connection={list_connection}
            status={status}
          />
        </Col>
        <Col span={18}>
          <Analyst status={status}/>
        </Col>
      </Row>
    </div>
  )
}

export default Portfolio
