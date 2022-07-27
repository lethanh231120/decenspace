import React from 'react'
import { Row, Col, Image, Typography } from 'antd'
const { Text, Title } = Typography

const DetailNFT = () => {
  return (
    <div className='nft-detail'>
      <Row gutter={16}>
        <Col span={12}>
          <div className='nft-detail-image'>
            <Image src='/coins/binance.png' preview={false}></Image>
          </div>
        </Col>
        <Col span={12}>
          <div className='nft-detail-content'>
            <div className='nft-detail-content-item'>
              <Title level={1} style={{ fontWeight: 700 }}>Elf #1009</Title>
              <Text style={{ fontSize: '20px', fontWeight: 500, color: '#808080' }}>Price: <span style={{ color: '#fff' }}>$485.72</span></Text>
              <Title style={{ padding: '15px 0' }} level={2}>Description</Title>
              <Text style={{ color: '#808080' }}>Elders Collection: https://opensea.io/collection/ethernalelves-elders Artifacts Collection: https://opensea.io/collection/ethernalelves-artifacts More about the Elvenverse: https://www.ethernalelves.com/</Text>
            </div>
            <div className='nft-detail-content-item'>
              <Title level={4}>Attributes</Title>
              <div className='nft-detail-content-list-attr'>
                <div className='nft-detail-content-item-attr'>
                  <Text style={{ color: '#808080', fontWeight: '700' }}>Class</Text>
                  <Title level={4} style={{ fontWeight: '500' }}>Ranger</Title>
                </div>
                <div className='nft-detail-content-item-attr'>
                  <Text style={{ color: '#808080', fontWeight: '700' }}>Class</Text>
                  <Title level={4} style={{ fontWeight: '500' }}>Ranger</Title>
                </div>
                <div className='nft-detail-content-item-attr'>
                  <Text style={{ color: '#808080', fontWeight: '700' }}>Class</Text>
                  <Title level={4} style={{ fontWeight: '500' }}>Ranger</Title>
                </div>
                <div className='nft-detail-content-item-attr'>
                  <Text style={{ color: '#808080', fontWeight: '700' }}>Class</Text>
                  <Title level={4} style={{ fontWeight: '500' }}>Ranger</Title>
                </div>
                <div className='nft-detail-content-item-attr'>
                  <Text style={{ color: '#808080', fontWeight: '700' }}>Class</Text>
                  <Title level={4} style={{ fontWeight: '500' }}>Ranger</Title>
                </div>
                <div className='nft-detail-content-item-attr'>
                  <Text style={{ color: '#808080', fontWeight: '700' }}>Class</Text>
                  <Title level={4} style={{ fontWeight: '500' }}>Ranger</Title>
                </div>
              </div>
            </div>
            <div>
              <Title style={{ color: '#808080' }} level={4}>About Collection</Title>
              <div className='nft-detail-content-list-link'>
                <a href='#' target='_blank'>Etherscan</a>
                <a href='#' target='_blank'>Etherscan</a>
                <a href='#' target='_blank'>Etherscan</a>
                <a href='#' target='_blank'>Etherscan</a>
                <a href='#' target='_blank'>Etherscan</a>
                <a href='#' target='_blank'>Etherscan</a>
                <a href='#' target='_blank'>Etherscan</a>
                <a href='#' target='_blank'>Etherscan</a>
                <a href='#' target='_blank'>Etherscan</a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default DetailNFT
