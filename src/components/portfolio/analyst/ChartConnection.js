import React, { memo, useEffect } from 'react'
import { LineChart, Line, YAxis, XAxis } from 'recharts'
// import { getDataDemo } from '../../api/dataDemo'
const ChartConnection = ({ data_coin_price }) => {
  const newData = []

  useEffect(() => {
    data_coin_price && data_coin_price.map((item) => {
      return newData.push(
        {
          price: item.price
        }
      )
    })
  }, [])

  return (
    <LineChart width={250} height={80} data={newData && newData}>
      <YAxis domain={['dataMin', 'dataMax']} hide={true}/>
      <XAxis dataKey='price' allowDataOverflow={false} hide={true} />
      <Line
        type='linear'
        dot={false}
        dataKey='price'
        stroke={newData?.shift()?.price < newData?.pop()?.price ? '#6ccf59' : '#ff4d4d'}
        strokeWidth={1}
      />
    </LineChart>
  )
}
export default memo(ChartConnection)
