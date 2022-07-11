import React from 'react'
import { Row, Col } from 'antd'
import './styles.scss'
import WalletAddress from '../../components/portfolio/WalletAddress'
import Analyst from '../../components/portfolio/Analyst'

const Portfolio = () => {
  return (
    <div>
      <Row>
        <Col span={6}>
          <WalletAddress />
        </Col>
        <Col span={18}>
          <Analyst />
        </Col>
      </Row>
    </div>
  )
}

export default Portfolio
