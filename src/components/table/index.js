import React from 'react'
import { Table } from 'antd'

const Columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
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

const data = []

const table = () => {
  return (
    <Table columns={Columns} dataSource={data}></Table>
  )
}

export default table
