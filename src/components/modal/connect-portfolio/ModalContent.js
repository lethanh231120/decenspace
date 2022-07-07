import React from 'react'
import { Row, Col, Image, Typography, Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { WAITING_CONNECT, SUCCESS_CONNECT, PORTFOLIO_CONNECT } from '../../../constants/TypeConstants'
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
  marginBottom: '12px'
}
const ModalContent = ({ type }) => {
  const navigate = useNavigate()
  const handleClickWallet = () => {
    navigate('../connect-wallet')
  }
  const handleClickSeePortfolio = () => {
    navigate('../portfolio')
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
      {type === WAITING_CONNECT ? (
        <>
            waitting
        </>
      ) : type === PORTFOLIO_CONNECT ? (
        <Row gutter={12}>
          <Col span={8}>
            <div style={StyleDiv}>
              <div>
                <Image
                  width={40}
                  preview={false}
                  src='/binance.png'
                />
                <Text style={{ fontSize: '18px', color: '#A8ADB3', fontWeight: '500', marginLeft: '10px' }}>Binance</Text>
              </div>
              <Text style={{ fontSize: '17px', color: '#fff', fontWeight: '400' }}>
                <ArrowRightOutlined style={{ fontSize: '12px', marginLeft: '6px' }}/>
              </Text>
            </div>
          </Col>
          <Col span={8}>
            <div style={StyleDiv} onClick={handleClickWallet}>
              <div>
                <Image
                  width={40}
                  preview={false}
                  src='/binance.png'
                />
                <Text style={{ fontSize: '18px', color: '#A8ADB3', fontWeight: '500', marginLeft: '10px' }}>Bitcoin Wallet</Text>
              </div>
              <Text style={{ fontSize: '17px', color: '#fff', fontWeight: '400' }}>
                <ArrowRightOutlined style={{ fontSize: '12px', marginLeft: '6px' }}/>
              </Text>
            </div>
          </Col>
          <Col span={8}>
            <div style={StyleDiv}>
              <div>
                <Image
                  width={40}
                  preview={false}
                  src='/binance.png'
                />
                <Text style={{ fontSize: '18px', color: '#A8ADB3', fontWeight: '500', marginLeft: '10px' }}>Binance</Text>
              </div>
              <Text style={{ fontSize: '17px', color: '#fff', fontWeight: '400' }}>
                <ArrowRightOutlined style={{ fontSize: '12px', marginLeft: '6px' }}/>
              </Text>
            </div>
          </Col>
        </Row>
      ) : type === SUCCESS_CONNECT ? (
        <Button className='button' onClick={handleClickSeePortfolio}>
          SEE MY ANALYTICS
        </Button>
      ) : ''}
    </div>
  )
}
export default ModalContent
