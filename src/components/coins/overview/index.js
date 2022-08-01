import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { get } from '../../../api/coinPriceService'
import moment from 'moment'
import { Area, ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts'
import { Row, Col } from 'antd'
import CustomTooltip from '../CustomTooltip'

const index = () => {
  const [list, setList] = useState()
  const { data: coinDetail } = useQuery(
    ['coinDetail'],
    async() => {
      const dataBtc = await get(`price/bitcoin/period?time=1w`)
      return dataBtc.data
    }
  )
  useEffect(() => {
    const list = []
    coinDetail && coinDetail.map((item) => {
      list.push(
        {
          ...item,
          createdDate: moment(item.createdDate).format('DD/MM/YYYY'),
          time: moment(item.createdDate).format('LLL')
        }
      )
    })
    setList(list.reverse())
  }, [coinDetail])
  return (
    <Row gutter={12}>
      <Col span={16}>
        <div style={{
          'boxSizing': 'border-box',
          'padding': '10px',
          'height': '1000px',
          'width': '100%',
          'backgroundColor': '#fff'
        }}>
          <ResponsiveContainer width='100%' height={300}>
            <AreaChart
              data={list}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#8884d8' stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey='createdDate' />
              <YAxis>
                <Label
                  value='Temperature &#8457;'
                  angle={-90}
                  position='left'
                  dy='-10'
                />
              </YAxis>
              <CartesianGrid vertical={false} horizontal={false} strokeDasharray='3 3'/>
              <Tooltip
                // wrapperStyle={{ backgroundColor: 'red' }}
                labelStyle={{ color: 'green' }}
                // itemStyle={{ color: 'cyan' }}
                formatter={function(value, name) {
                  return `${value}`
                }}
                labelFormatter={function(value) {
                  return `label: ${value}`
                }}
              />
              <Area
                type='linear'
                dataKey='currentPrice'
                stroke='#8884d8'
                fill='url(#colorValue)'
              />
            </AreaChart>
          </ResponsiveContainer>
          <ResponsiveContainer width='100%' height={300}>
            <AreaChart
              data={list && list}
              margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
            >
              <defs>
                <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#8884d8' stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey='createdDate'>
                <Label value='Date' position='bottom' />
              </XAxis>
              <YAxis dataKey='currentPrice'>
                <Label
                  value='Temperature &#8457;'
                  angle={-90}
                  position='left'
                  dy='-10'
                />
              </YAxis>
              <CartesianGrid vertical={false} horizontal={false} />
              <Tooltip content={<CustomTooltip payload={ list && list} />} />
              <Area
                type='linear'
                dataKey='currentPrice'
                stroke='#8884d8'
                fill='url(#colorValue)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Col>
      <Col span={8}>
      </Col>
    </Row>
  )
}
export default index
