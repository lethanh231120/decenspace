import React from 'react'
import { Area, ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Row, Col } from 'antd'
import Swap from '../../../pages/swap'
import moment from 'moment'
import CustomTooltip from '../CustomTooltip'
const index = ({ list }) => {
  return (
    <Row gutter={24}>
      <Col span={18}>
        <div style={{
          'boxSizing': 'border-box',
          'padding': '10px',
          'height': '1000px',
          'width': '100%',
          'backgroundColor': '#fff'
        }}>
          <ResponsiveContainer width='100%' height={550}>
            <AreaChart
              data={list}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#ff9332' stopOpacity={0.4} />
                  <stop offset='95%' stopColor='#ff9332' stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey='createdDate'
                tickFormatter={function(value) {
                  const date = moment(value).format('DD/MM/YYYY')
                  return date
                }}
                // interval={10}
                axisLine={false}
                tickLine={false}
                // width={100}
                padding={{ left: 30 }}
                // tick={{ stroke: 'red', strokeWidth: 2 }}
                // scale='log'
              />
              <YAxis
                tickCount={10}
                axisLine={false}
                tickLine={false}
                tickFormatter={function(value) {
                  const price = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                  }).format(value)
                  return price
                }}
                domain={['dataMin - 100', 'dataMax + 100']}
              />
              <CartesianGrid vertical={false} horizontal={false}/>
              {/* <Tooltip
                // wrapperStyle={{ backgroundColor: 'red' }}
                labelStyle={{ color: 'green' }}
                // itemStyle={{ color: 'cyan' }}
                formatter={function(value, name) {
                  console.log(value, name)
                  // return `${value}`
                }}
                labelFormatter={function(value) {
                  const date = moment(value).format('Do MMMM YYYY, h:mm a')
                  return date
                }}
              /> */}
              <Tooltip content={<CustomTooltip payload={list} />} />
              <Area
                type='linear'
                dataKey='currentPrice'
                stroke='#ff9332'
                fillOpacity={0.5}
                fill='url(#colorValue)'
              />
            </AreaChart>
          </ResponsiveContainer>
          {/* <ResponsiveContainer width='100%' height={550}>
            <AreaChart
              data={list}
              margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
            >
              <defs>
                <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#ff9332' stopOpacity={0.4} />
                  <stop offset='95%' stopColor='#ff9332' stopOpacity={0.0} />
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
              <Tooltip content={<CustomTooltip payload={ list} />} />
              <Area
                type='linear'
                dataKey='currentPrice'
                stroke='#ff9332'
                fill='url(#colorValue)'
              />
            </AreaChart>
          </ResponsiveContainer> */}
        </div>
      </Col>
      <Col span={6}>
        <div className='coin-detail-swap'>
          <Swap/>
        </div>
      </Col>
    </Row>
  )
}
export default index
