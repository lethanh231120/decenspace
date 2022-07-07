import React from 'react'
import { Typography, Input } from 'antd'
const { Title } = Typography
const { Search } = Input
import { PORTFOLIO_CONNECT, WAITING_CONNECT } from '../../../constants/TypeConstants'
const ModalHeader = ({ type }) => {
  const onSearch = (value) => console.log(value)
  return (
    <div style={{ padding: '20px 40px', textAlign: 'center' }}>
      {type === PORTFOLIO_CONNECT ? (
        <>
          <Title style={{ fontSize: '40px', color: '#fff', fontWeight: '600', textAlign: 'center' }}>
            More than 70+ platforms supported. Choose and connect in few clicks.
          </Title>
          <Search
            placeholder='input search text'
            onSearch={onSearch}
            className='input-search'
            style={{
              width: '90%'
            }}
          />
        </>)
        : type === WAITING_CONNECT ? (
          <Title style={{ fontSize: '28px', color: '#fff', fontWeight: '600', textAlign: 'center' }}>
            It May Take a Few Seconds to Connect Bitcoin Wallet to CoinStats
          </Title>)
          : ''}
    </div>
  )
}
export default ModalHeader
