import { Col, Row, Select } from 'antd'
import React from 'react'
import { usdMoneyFormat } from '../../utils/parseFloat'
import Table from '../table'
import './styles.scss'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

const { Option } = Select

const handleChange = (value) =>{
  console.log(value)
}

const Analyst = () => {
  const priceChange = parseFloat('2.36')
  return (
    <div className='dashboard'>
      <Row>
        <Col span={24}>
          <Col span={24}>
            <div className='main-price'>{usdMoneyFormat(5167722604)}</div>
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
                <Option value='24H'>24H</Option>
                <Option value='1W'>1W</Option>
                <Option value='1M'>1M</Option>
                <Option value='3M'>3M</Option>
                <Option value='6M'>6M</Option>
                <Option value='1Y'>1Y</Option>
                <Option value='ALL'>ALL</Option>
              </Select>
            </div>
          </Col>
        </Col>
        <Col span={24}>
          <Table />
        </Col>
      </Row>
    </div>
  )
}

export default Analyst
