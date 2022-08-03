import React from 'react'
import { Typography, Row, Col } from 'antd'
import './style.scss'
import { NFT } from './NFT'
import { ArrowLeftOutlined } from '@ant-design/icons'
const { Text, Title } = Typography

export const ListNftGroup = ({ listGroup, hancleBack, count }) => {
  return (
    <div className='nft'>
      <div className='nft-title'>
        <div className='nft-title-back' onClick={hancleBack}>
          <ArrowLeftOutlined/>
        </div>
        {listGroup?.value[0]?.nft?.name}
      </div>
      <div className='nft-header'>
        <div className='nft-header-total'>
          <Text>Total Worth</Text>
          <Title level={2}>$ {listGroup && listGroup?.value?.reduce((total, item) => {
            return (total + (item?.price * item?.nft?.amount * (1 / Math.pow(10, 18))))
            // return (total + (item?.price * item?.nft?.amount * (1 / Math.pow(10, 18))))?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          }, 0)}</Title>
        </div>
        <div className='nft-header-count'>
          <Text>NFT Count</Text>
          <Title level={2}>{listGroup && listGroup?.value?.length}</Title>
        </div>
      </div>
      <div className='nft-header-list'>
        <Row gutter={[16, 16]}>
          {listGroup?.value && listGroup?.value?.map((item, index) => (
            <Col span={6} key={index}>
              <NFT key={index} item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
