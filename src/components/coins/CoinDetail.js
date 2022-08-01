import React from 'react'
// import { useLocation } from 'react-router-dom'
import { Tabs } from 'antd'
import { Row, Col, Image } from 'antd'
import { StarOutlined, CaretDownOutlined, CaretUpOutlined, InfoCircleOutlined } from '@ant-design/icons'
import './style.scss'
import OverView from './overview'
const { TabPane } = Tabs

export const CoinDetail = () => {
  return (
    <div>
      <div className='coin-detail-header'>
        <div className='coin-detail-header-overview'>
          <div className='coin-detail-header-info'>
            <div className='coin-detail-header-info-image'>
              <Image src='/coins/bitcoin.png' preview={false}/>
            </div>
            <div className='coin-detail-header-info-name'>
              Bitcoin Price
              <span className='coin-detail-header-info-symple'>(BTC)</span>
            </div>
            <div className='coin-detail-header-info-icon'>
              <StarOutlined/>
            </div>
            <div className='coin-detail-header-info-icon'>
              <StarOutlined/>
            </div>
          </div>
          <div className='coin-detail-header-price'>
            <div className='coin-detail-header-price-num'>
              $23,352.90
            </div>
            <div className='coin-detail-header-price-percent'>
              <CaretDownOutlined/>-0.1%
            </div>
          </div>
          <div className='coin-detail-header-market'>
            <div className='coin-detail-header-market-num'>
              B 1
            </div>
            <div className='coin-detail-header-market-percent'>
              <CaretUpOutlined/>+0.3%
            </div>
          </div>
        </div>
        <Row>
          <Col span={12}>
            <Row gutter={12}>
              <Col span={4}>
                <span className='coin-detail-header-content-item-title'>
                  Website
                </span>
              </Col>
              <Col span={20}>
                <div className='coin-detail-header-content-list-item-network'>
                  <div className='coin-detail-header-content-item-box'>
                    Bitcoin.org
                  </div>
                  <div className='coin-detail-header-content-item-box'>
                    Bitcoin.org
                  </div>
                  <div className='coin-detail-header-content-item-box'>
                    Bitcoin.org
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={4}>
                <span className='coin-detail-header-content-item-title'>
                  Community
                </span>
              </Col>
              <Col span={20}>
                <div className='coin-detail-header-content-list-item-network'>
                  <div className='coin-detail-header-content-item-box'>
                    Twitter
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={4}>
                <span className='coin-detail-header-content-item-title'>
                  Explorers
                </span>
              </Col>
              <Col span={20}>
                <div className='coin-detail-header-content-list-item-network'>
                  <div className='coin-detail-header-content-item-box'>
                    OkLink
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <div className='coin-detail-header-content-list'>
              <div className='coin-detail-header-content-list-item-parameter'>
                <div className='coin-detail-header-content-item'>
                  <span className='coin-detail-header-content-item-title'>
                    Market Cap
                    <div className='coin-detail-header-content-item-icon'>
                      <InfoCircleOutlined />
                    </div>
                  </span>
                  <span className='coin-detail-header-content-num'>$446.3B</span>
                </div>
                <div className='coin-detail-header-content-item'>
                  <span className='coin-detail-header-content-item-title'>
                    Volumn 24h
                    <div className='coin-detail-header-content-item-icon'>
                      <InfoCircleOutlined />
                    </div>
                  </span>
                  <span className='coin-detail-header-content-num'>$28.4B</span>
                </div>
              </div>
              <div className='coin-detail-header-content-list-item-parameter'>
                <div className='coin-detail-header-content-item'>
                  <div className='coin-detail-header-content-item-title'>
                    Circulating Supply
                    <div className='coin-detail-header-content-item-icon'>
                      <InfoCircleOutlined />
                    </div>
                  </div>
                  <span className='coin-detail-header-content-num'>19,109,031</span>
                </div>
                <div className='coin-detail-header-content-item'>
                  <span className='coin-detail-header-content-item-title'>
                    Total Supply
                    <div className='coin-detail-header-content-item-icon'>
                      <InfoCircleOutlined />
                    </div>
                  </span>
                  <span className='coin-detail-header-content-num'>21,000,000</span>
                </div>
              </div>
              <div className='coin-detail-header-content-list-item-parameter'>
                <div className='coin-detail-header-content-item'>
                  <span className='coin-detail-header-content-item-title'>
                    Fully Diluted Valuation
                    <div className='coin-detail-header-content-item-icon'>
                      <InfoCircleOutlined />
                    </div>
                  </span>
                  <span className='coin-detail-header-content-num'>$490.4B</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='OVERVIEW' key='1'>
          <OverView/>
        </TabPane>
        <TabPane tab='NEWS' key='2'>
          dkjdhskjahdkjs
        </TabPane>
        <TabPane tab='MARKETS' key='3'>
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab='HOLDINGS' key='4'>
          Content of Tab Pane 4
        </TabPane>
        <TabPane tab='TEAM UPDATES' key='5'>
          Content of Tab Pane 5
        </TabPane>
        <TabPane tab='ON-CHAIN DATA' key='6'>
          Content of Tab Pane 6
        </TabPane>
      </Tabs>
    </div>
  )
}
