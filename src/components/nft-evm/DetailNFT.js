import React from 'react'
import { Row, Col, Image, Typography, Table, Tooltip } from 'antd'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getNFT } from '../../api/nftService'
import moment from 'moment'
const { Text, Title } = Typography

const DetailNFT = () => {
  const { state } = useLocation()
  const { data } = state
  const { data: transactions } = useQuery(
    ['transactions'],
    async() => {
      const transactionNFT = await getNFT(`nft/transaction/nftId=${data?.nft?.id}`)
      return transactionNFT.data
    }
  )
  console.log(data)
  console.log(transactions)
  const columns = [
    {
      title: '#',
      render: (_, record) => (<span style={{ color: '#fff' }}>{record?.prices?.rank}</span>)
    },
    {
      title: 'Price',
      render: (_, record) => (<div style={{ color: '#fff', textAlign: 'left' }}>{record?.value}</div>)
    },
    {
      title: 'From',
      render: (_, record) => (<div style={{ color: '#fff' }}>{record?.seller_address}</div>)
    },
    {
      title: 'To',
      render: (_, record) => (<div style={{ color: '#fff' }}>{record?.buyer_address}</div>)
    },
    {
      title: 'Date',
      render: (_, record) => (<Tooltip color='#fff' placement='topLeft' title={`${moment(record?.created_date).format('MMMM Do YYYY, h:mm:ss a')}`}>
        <div style={{ color: '#fff' }}>{moment(record?.created_date).fromNow()}</div>
      </Tooltip>)
    }
  ]

  return (
    <>
      <div className='nft-detail'>
        <Row gutter={16}>
          <Col span={12}>
            <div className='nft-detail-image'>
              <Image src={data.nft.metadata !== '' && data.nft.metadata !== undefined ? JSON.parse(data?.nft?.metadata)?.image : ''} preview={false}></Image>
            </div>
          </Col>
          <Col span={12}>
            <div className='nft-detail-content'>
              <div className='nft-detail-content-item'>
                <Title level={1} style={{ fontWeight: 700 }}>Elf #1009</Title>
                <Text style={{ fontSize: '20px', fontWeight: 500, color: '#808080' }}>
                  Price: <span style={{ color: '#fff' }}>
                    $ {(data?.price * (1 / Math.pow(10, 18))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </span>
                </Text>
                <Title style={{ padding: '15px 0' }} level={2}>Description</Title>
                <Text style={{ color: '#808080' }}>
                  {data.nft.metadata !== '' && data.nft.metadata !== undefined && JSON.parse(data?.nft?.metadata)?.description}
                </Text>
              </div>
              <div className='nft-detail-content-item'>
                <Title level={4}>Attributes</Title>
                <div className='nft-detail-content-list-attr'>
                  {data.nft.metadata !== '' && data.nft.metadata !== undefined && JSON.parse(data?.nft?.metadata)?.attributes?.map((item, index) => (
                    <div className='nft-detail-content-item-attr' key={index}>
                      <Text style={{ color: '#808080', fontWeight: '700' }}>{item?.trait_type}</Text>
                      <Title level={4} style={{ fontWeight: '500' }}>{item?.value}</Title>
                    </div>
                  ))}
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
      <div style={{ color: '#fff', textAlign: 'left', padding: '0 100px', fontSize: '24px', fontWeight: '700' }}>Transactions</div>
      <Table
        // loading={isLoading}
        style={{ padding: '40px 100px' }}
        columns={columns}
        dataSource={transactions && transactions?.nftTradeRepo}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
      />
    </>
  )
}
export default DetailNFT
