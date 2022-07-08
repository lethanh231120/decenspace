import { Col, Row } from 'antd'
import React from 'react'
import Table from '../table'
import './styles.scss'

const Analyst = () => {
  return (
    <div className='dashboard'>
      <Row>
        <Col span={24}>
          <Col span={24}>$5714.97</Col>
          <Col span={24}>
            <span>$123.04</span>
            <span>Up 2.20%</span>
            <span>24H</span>
          </Col>
        </Col>
        <Col span={24}>
          <Table />
        </Col>
      </Row>
    </div>
  )
}

export default Analyst
