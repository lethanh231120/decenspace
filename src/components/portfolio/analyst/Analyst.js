import React, { useEffect, useState, useCallback, memo } from 'react'
import { Col, Row } from 'antd'
import Holdings from './Holdings'
import '../styles.scss'
import { EXCHANGE } from '../../../constants/TypeConstants'
import { HeaderAnalyst } from './HeaderAnalyst'

const Analyst = (props) => {
  const { setParams, params, dataConnection, data_coin_price, isGroupNFT, setIsGroupNFT, isLoading } = props
  const priceChange = parseFloat('2.36')
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    let value
    dataConnection?.holdings && dataConnection?.holdings.length > 0 && dataConnection?.holdings?.reduce(myFunc, 0)
    function myFunc(total, currenValue) {
      let balance
      const price = currenValue.coinPriceUSD
      if (currenValue?.holding?.balance) {
        balance = currenValue?.holding?.balance * (1 / Math.pow(10, currenValue?.holding?.decimals))
      } else {
        balance = currenValue?.holding?.amount * EXCHANGE
      }
      const money = price * balance
      value = total + money
      return value
    }
    setTotalValue(value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
  }, [dataConnection])

  const handleChange = useCallback((value) =>{
    setParams({
      ...params,
      time: value
    })
  }, [])

  return (
    <div className='dashboard'>
      <Row>
        <HeaderAnalyst
          totalValue={totalValue}
          priceChange={priceChange}
          handleChange={handleChange}
          data_coin_price={data_coin_price}
        />
        <Col span={24}>
          <Holdings
            dataConnection={dataConnection}
            isGroupNFT={isGroupNFT}
            setIsGroupNFT={setIsGroupNFT}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </div>
  )
}

export default memo(Analyst)
