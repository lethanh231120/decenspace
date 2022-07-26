import { Col, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { usdMoneyFormat } from '../../utils/parseFloat'
import Table from '../table'
import './styles.scss'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
// import { SUCCESS_DELETE_CONNECTION } from '../../constants/StatusMessageConstants'
// import { get } from '../../api/addressService'
// import { getDataDemo } from '../../api/dataDemo'
// import { EXCHANGE } from '../../constants/TypeConstants'

const { Option } = Select

const Analyst = ({ status, setParams, params, dataConnection }) => {
  const priceChange = parseFloat('2.36')
  // const [data, setData] = useState([])
  const [totalValue, setTotalValue] = useState(0)
  // const amountArray = []
  // useEffect(()=>{
  //   const getData = async() =>{
  //     const response = await get('addresses/holdings')
  //     const data = response?.data
  //     setData(data)
  //   }
  //   getData()
  // }, [status === SUCCESS_DELETE_CONNECTION])

  // console.log(dataConnection)
  // get data demo list coins
  // const getDataCoinstats = async() => {
  //   const res = await getDataDemo('coins', {
  //     skip: 0,
  //     limit: 100,
  //     currency: 'EUR'
  //   })
  //   console.log('data coinstats', res.coins)
  // }

  // useEffect(() => {
  //   getDataCoinstats()
  // }, [])

  // end get data demo coins

  // useEffect(()=>{
  //   // 5 lần lặp
  //   let number = 0
  //   data?.map((item, index)=>{
  //     const amount = (item.holdings[0].holding.amount) * EXCHANGE
  //     // amountArray.push(amount)
  //     const coinPriceByUSD = item.holdings[0].coinPriceUSD
  //     // console.log({
  //     //   'amount': amount,
  //     //   'coinPriceByUSD': coinPriceByUSD
  //     // })
  //     number += amount * coinPriceByUSD
  //     // let totalVal = 0
  //     // for (let i = 0; i < amountArray.length; i++) {
  //     //   totalVal += amountArray[i] * coinPriceByUSD
  //     // }
  //     // setTotalValue(totalVal)
  //   })
  //   setTotalValue(number)
  // }, [data])

  useEffect(() => {
    let value
    dataConnection && dataConnection.length > 0 && dataConnection.map((item) => {
      value = item.holdings.reduce(myFunc, 0)
    })

    function myFunc(total, currenValue) {
      const price = currenValue.coinPriceUSD
      const balance = currenValue.holding.balance * (1 / Math.pow(10, currenValue.holding.decimals))
      const money = price * balance
      return total + money
    }
    setTotalValue(value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
  }, [dataConnection])

  const handleChange = (value) =>{
    setParams({
      ...params,
      time: value
    })
  }

  return (
    <div className='dashboard'>
      <Row>
        <Col span={24}>
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
        <Col span={24}>
          <Table dataConnection={dataConnection}/>
        </Col>
      </Row>
    </div>
  )
}

export default Analyst
