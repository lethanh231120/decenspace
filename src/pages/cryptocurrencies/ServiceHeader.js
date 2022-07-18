import React from 'react'
import { Row, Col, Typography, Layout } from 'antd'

import { CaretDownOutlined } from '@ant-design/icons'

const { Content } = Layout
const { Title, Text } = Typography

const ServiceHeader = () => {
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Typography style={{ textAlign: 'center', padding: '30px 0' }}>
            <Title style={{ fontWeight: 'bold', fontSize: '35px', color: '#fff' }}>
              Best Coin Price Tracker in the Market
            </Title>
            <Text style={{ color: '#A8ADB3', fontSize: '18px', display: 'block' }}>
              With CoinStats, you can manage all your crypto assets from one interface.
            </Text>
            <Text style={{ color: '#A8ADB3', fontSize: '18px' }}>
              The global crypto market cap is $979.1B a 2.37 % decrease over the last day.
            </Text>
          </Typography>
        </Col>
      </Row>
      <Content style={{ padding: '0 40px' }}>
        <Row gutter={20}>
          <Col span={8}>
            <div style={{ backgroundColor: 'rgba(255,53,53,0.1)', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
              <Text style={{ color: '#A8ADB3' }}> Market Cap</Text>
              <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0 0 0' }}>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 10px 0 0' }}>$987,987,987</p>
                <div style={{ padding: '3px 5px', borderRadius: '5px', backgroundColor: 'rgba(52, 199, 89, 0.1)', color: '#34b349', fontWeight: 'bold' }}>
                  <CaretDownOutlined/>-2.31%
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ backgroundColor: 'rgba(50, 215, 75, 0.1)', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
              <Text style={{ color: '#A8ADB3' }}>Volumn 24h</Text>
              <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0 0 0' }}>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 10px 0 0' }}>$987,987,987</p>
                <div style={{ padding: '3px 5px', borderRadius: '5px', backgroundColor: 'rgba(52, 199, 89, 0.1)', color: '#34b349', fontWeight: 'bold' }}>
                  <CaretDownOutlined />+3.5%
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ backgroundColor: 'rgba(255,53,53,0.1)', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
              <Text style={{ color: '#A8ADB3' }}>BTC Dominance</Text>
              <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0 0 0' }}>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 10px 0 0' }}>$987,987,987</p>
                <div style={{ padding: '3px 5px', borderRadius: '5px', backgroundColor: 'rgba(52, 199, 89, 0.1)', color: '#34b349', fontWeight: 'bold' }}>
                  <CaretDownOutlined/>-0.025%
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </>
  )
}

export default ServiceHeader
