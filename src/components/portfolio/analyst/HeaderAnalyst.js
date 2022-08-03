import React from 'react'
import { Col, Row, Select } from 'antd'
import ChartConnection from './ChartConnection'
import { usdMoneyFormat } from '../../../utils/parseFloat'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

const { Option } = Select
export const HeaderAnalyst = ({ totalValue, priceChange, handleChange, data_coin_price }) => {
  return (
    <Col span={24}>
      <Row>
        <Col span='10'>
          <Col span={24}>
            <div className='main-price'>${totalValue}</div>
          </Col>
          <Col span={24}>
            <div className='data-change'>
              { priceChange > 0
                ? <>
                  <span className='change-price-up'>{usdMoneyFormat(123.04)}</span>
                  <span>
                    <span className='price-up change-price-up'><CaretUpOutlined/></span>
                    <span className='change-price-up'>{priceChange}%</span>
                  </span>
                </>
                : <>
                  <span className='change-price-down'>{usdMoneyFormat(123.04)}</span>
                  <span>
                    <span className='price-down change-price-down'><CaretDownOutlined/></span>
                    <span className='change-price-down'>{priceChange}%</span>
                  </span>
                </>
              }
              <Select
                defaultValue='1W'
                onChange={handleChange}
                color='rgba(0,0,0,.85)'
              >
                <Option value='1h'>1H</Option>
                <Option value='1d'>24H</Option>
                <Option value='1w'>1W</Option>
                <Option value='1m'>1M</Option>
                <Option value='3m'>3M</Option>
                <Option value='6m'>6M</Option>
                <Option value='1y'>1Y</Option>
                <Option value='all'>ALL</Option>
              </Select>
            </div>
          </Col>
        </Col>
        <Col span='14'>
          <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'center' }}>
            <ChartConnection data_coin_price={data_coin_price}/>
          </div>
        </Col>
      </Row>
    </Col>
  )
}
