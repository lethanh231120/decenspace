import React from 'react'
import { Row, Col, Image, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { platforms } from '../../../utils/platforms/Platforms'
const { Text } = Typography

const StyleDiv = {
  cursor: 'pointer',
  border: '1px solid #262626',
  borderRadius: '15px',
  padding: '10px',
  display: 'flex',
  backgroundColor: '#000',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px',
  minHeight: '73px'
}
const ModalContent = () => {
  const navigate = useNavigate()
  const handleClickWallet = (platformId) => {
    navigate(`../../connect/${platformId}`)
  }

  return (
    <div
      style={{
        padding: '20px',
        maxHeight: '400px',
        overflowY: 'auto'
      }}
      className='content-modal'
    >
      <Row gutter={12}>
        {platforms.map((item, index) => (
          <Col span={8} key={index}>
            <div style={StyleDiv} onClick={() => handleClickWallet(item.id)}>
              <div
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Image
                  width={40}
                  preview={false}
                  src={item.icon}
                />
                <Text style={{ fontSize: '16px', color: '#A8ADB3', fontWeight: '500', marginLeft: '10px', flexWrap: 'wrap' }}>{item.name}</Text>
              </div>
              <Text style={{ fontSize: '17px', color: '#fff', fontWeight: '400' }}>
                <ArrowRightOutlined style={{ fontSize: '12px', marginLeft: '6px' }}/>
              </Text>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default ModalContent
