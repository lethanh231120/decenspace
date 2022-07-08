import React from 'react'
import { Table } from 'antd'
import { usdMoneyFormat } from '../../utils/parseFloat'

const Columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>
      <img src='https://png.monster/wp-content/uploads/2022/02/png.monster-623.png' alt='btc logo'></img>
      {text}
      <span>*BTC</span>
    </a>
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total'
  },
  {
    title: '24HOURS P/L',
    dataIndex: 'change',
    key: 'change'
  }
]

const data = [
  {
    key: '1',
    name: 'Bitcoin',
    amount: `${usdMoneyFormat(252958)}`,
    price: `${usdMoneyFormat(20458.35)}`,
    total: `${usdMoneyFormat(5167772604.76)}`,
    change: `${usdMoneyFormat(103810204.21)}`
  }
]

const table = () => {
  return (
    <Table columns={Columns} dataSource={data} pagination='false'></Table>
  )
}

export default table
