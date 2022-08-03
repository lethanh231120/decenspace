import React from 'react'
import { Typography, Row, Col, Image } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { platforms } from '../../utils/platforms/Platforms'
const { Title, Text } = Typography
export default function Home() {
  const navigate = useNavigate()
  const list = platforms.slice(0, 3)
  const handelClickConnect = () => {
    navigate('../connect-portfolio')
  }

  const handleConnectWallet = (id) => {
    navigate(`../connect/${id}`)
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
            {list && list.map((item, index) => (
              <Col span={8} key={index} onClick={() => handleConnectWallet(item.id)}>
                <div style={{ cursor: 'pointer', border: '1px solid #262626', borderRadius: '12px', padding: '15px 0' }}>
                  <Image width={80} preview={false} src={item.icon}/>
                  <Text style={{ fontSize: '16px', color: '#A8ADB3', fontWeight: '200', display: 'block' }}>{item.name}</Text>
                  <Text style={{ fontSize: '17px', color: '#fff', fontWeight: '400' }}>
                    Connect
                    <ArrowRightOutlined style={{ fontSize: '12px', marginLeft: '6px' }}/>
                  </Text>
                </div>
              </Col>
            ))}
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
    </div>
  )
}
