import React from 'react'
import { Typography, Row, Col } from 'antd'
import './style.scss'
import { NFT } from './NFT'
const { Text, Title } = Typography

export const ListNftGroup = () => {
  return (
    <div className='nft'>
      <div className='nft-header'>
        <div className='nft-header-total'>
          <Text>Total Worth</Text>
          <Title level={2}>10</Title>
        </div>
        <div className='nft-header-count'>
          <Text>NFT Count</Text>
          <Title level={2}>23</Title>
        </div>
      </div>
      <div className='nft-header-list'>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <NFT/>
          </Col>
          <Col span={6}>
            <NFT/>
          </Col>
        </Row>
      </div>
    </div>
  )
}
