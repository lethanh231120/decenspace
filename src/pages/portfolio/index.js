import React from 'react'
import { Row, Col } from 'antd'
import './styles.scss'
import WalletAddress from '../../components/portfolio/WalletAddress'
import Analyst from '../../components/portfolio/Analyst'

const Portfolio = () => {
  return (
    <div>
      <Row>
        <Col span={4}>
          <WalletAddress />
        </Col>
        <Col span={20}>
          <Analyst />
        </Col>
      </Row>
    </div>
  )
}

export default Portfolio
