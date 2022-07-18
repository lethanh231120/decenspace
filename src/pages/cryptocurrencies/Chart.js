import React, { useEffect, useState } from 'react'
import { LineChart, Line, YAxis, XAxis } from 'recharts'
import { getDataDemo } from '../../api/dataDemo'
const Chart = ({ record, statusReload, setStatusReload }) => {
  const [data, setData] = useState()
  const newData = []

  const getData = async() => {
    const res = await getDataDemo('charts', {
      period: '1w',
      coinId: record.id
    })
    setData(res.chart)
  }

  useEffect(() => {
    getData()
    setStatusReload(false)
  }, [statusReload === true])

  useEffect(() => {
    const timer = setInterval(() => {
      getData()
      setStatusReload(false)
    }, 60000)
    return () => clearTimeout(timer)
  }, [])

  data && data.map((item) => {
    return newData.push(
      {
        price: item[1]
      }
    )
  })

  return (
    <LineChart width={120} height={60} data={newData && newData}>
      <YAxis domain={['dataMin', 'dataMax']} hide={true}/>
      <XAxis dataKey='price' allowDataOverflow={false} hide={true} />
      <Line
        type='linear'
        dot={false}
        dataKey='price'
        stroke={newData?.shift()?.price < newData?.pop()?.price ? '#6ccf59' : '#ff4d4d'}
        strokeWidth={0.7}
      />
    </LineChart>
  )
}
export default Chart
