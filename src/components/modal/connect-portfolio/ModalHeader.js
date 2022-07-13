import React from 'react'
import { Typography, Input } from 'antd'
const { Title } = Typography
const { Search } = Input
const ModalHeader = () => {
  const onSearch = (value) => console.log(value)
  return (
    <div style={{ padding: '20px 40px', textAlign: 'center' }}>
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
    </div>
  )
}
export default ModalHeader
