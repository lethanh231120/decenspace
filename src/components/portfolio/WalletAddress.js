import { Button, Col, Row, Collapse, Typography } from 'antd'
import React from 'react'
import { } from '@ant-design/icons'
import './styles.scss'

const { Panel } = Collapse
const { Link } = Typography
const WalletAddress = () => {
  return (
    <div className='sidebar'>
      <Row>
        <Col span={24}>
          <Button>CONNECT PORTFOLIO</Button>
        </Col>
        <Col span={24}>
          <Collapse className='panel' ghost defaultActiveKey={['1']}>
            <Panel header='Assets' key='1'>
              <Link to='#'>Address 1</Link>
              <Link to='#'>Address 2</Link>
              <Link to='#'>Address 3</Link>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  )
}

export default WalletAddress
