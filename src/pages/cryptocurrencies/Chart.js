import React, { useEffect, useState } from 'react'
import { LineChart, Line, YAxis, XAxis } from 'recharts'
const Chart = ({ record }) => {
  const [dataPrice, setDataPrice] = useState([])
  useEffect(() => {
    const newData = []
    record.map((item) => {
      newData.push(
        {
          price: item
        }
      )
    })
    setDataPrice(newData)
  }, [record])

  return (
    <LineChart width={120} height={60} data={dataPrice && dataPrice}>
      <YAxis domain={['dataMin', 'dataMax']} hide={true}/>
      <XAxis dataKey='price' allowDataOverflow={false} hide={true} />
      <Line
        type='linear'
        dot={false}
        dataKey='price'
        stroke={dataPrice?.shift()?.price < dataPrice?.pop()?.price ? '#6ccf59' : '#ff4d4d'}
        strokeWidth={0.7}
      />
    </LineChart>
  )
}
export default Chart
