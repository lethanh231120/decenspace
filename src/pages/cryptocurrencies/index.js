import React from 'react'
import ServiceHeader from './ServiceHeader'
import ServiceTable from './ServiceTable'
import { Layout } from 'antd'
import './style.scss'

const { Content } = Layout
const Cryptocurrencies = () => {
  return (
    <Layout>
      <Content style={{ padding: '0 10%', backgroundColor: '#000', color: '#fff' }}>
        <ServiceHeader/>
        <ServiceTable/>
      </Content>
    </Layout>
  )
}
export default Cryptocurrencies
