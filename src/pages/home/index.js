import React from 'react'
import { Typography, Row, Col, Image } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import './index.scss'
// import ModalConnect from '../../components/modal/connect-portfolio'
// import { PORTFOLIO_CONNECT } from '../../constants/TypeConstants'
import { useNavigate } from 'react-router-dom'
const { Title, Text } = Typography
export default function Home() {
  // const [isModalVisible, setIsModalVisible] = useState(false)
  // const [type, setType] = useState()

  const navigate = useNavigate()

  const handelClickConnect = () => {
    navigate('../connect-portfolio')
    // setIsModalVisible(true)
    // setType(PORTFOLIO_CONNECT)
  }

  return (
    <div style={{ padding: '100px 0', margin: '0px auto' }}>
      <Typography style={{ textAlign: 'center', alignItems: 'center' }}>
        <Title style={{ fontWeight: 'bold', fontSize: '35px', color: '#fff', margin: '0px auto', display: 'flex', width: '500px' }}>
          Manage Your Crypto and DeFi Portfolio From One Place
        </Title>
        <Text style={{ color: '#A8ADB3', fontSize: '20px', display: 'block', padding: '30px 0' }}>
          Securely connect the portfolio you’re using to start.
        </Text>
      </Typography>
      <Row>
        <Col span={8} offset={8}>
          <Row gutter={24}>
            <Col span={8}>
              <div style={{ cursor: 'pointer', border: '1px solid #262626', borderRadius: '12px', padding: '15px 0' }}>
                <Image
                  width={80}
                  preview={false}
                  src='/binance.png'
                />
                <Text style={{ fontSize: '16px', color: '#A8ADB3', fontWeight: '200', display: 'block' }}>Binance</Text>
                <Text style={{ fontSize: '17px', color: '#fff', fontWeight: '400' }}>
                  Connect
                  <ArrowRightOutlined style={{ fontSize: '12px', marginLeft: '6px' }}/>
                </Text>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ cursor: 'pointer', border: '1px solid #262626', borderRadius: '12px', padding: '15px 0' }}>
                <Image
                  width={80}
                  preview={false}
                  src='/metamark.png'
                />
                <Text style={{ fontSize: '16px', color: '#A8ADB3', fontWeight: '200', display: 'block' }}>Binance</Text>
                <Text style={{ fontSize: '17px', color: '#fff', fontWeight: '400' }}>
                  Connect
                  <ArrowRightOutlined style={{ fontSize: '12px', marginLeft: '6px' }}/>
                </Text>
              </div>
            </Col>
            <Col span={8}>
              <div style={{ cursor: 'pointer', border: '1px solid #262626', borderRadius: '12px', padding: '15px 0' }}>
                <Image
                  width={80}
                  preview={false}
                  src='/coinbase.png'
                />
                <Text style={{ fontSize: '16px', color: '#A8ADB3', fontWeight: '200', display: 'block' }}>Binance</Text>
                <Text style={{ fontSize: '17px', color: '#fff', fontWeight: '400' }}>
                  Connect
                  <ArrowRightOutlined style={{ fontSize: '12px', marginLeft: '6px' }}/>
                </Text>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Title style={{ color: '#A8ADB3', fontSize: '18px', padding: '30px 0' }}>Or</Title>
      <button
        onClick={handelClickConnect}
        style={{
          padding: '10px 40px',
          borderRadius: '25px',
          fontSize: '16px',
          backgroundColor: '#ff9332',
          color: '#000',
          fontWeight: '500',
          letterSpacing: '1px',
          cursor: 'pointer'
        }}>
          CONNECT ORTHER
      </button>
      {/* <ModalConnect
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        type={type}
      /> */}
    </div>
  )
}
