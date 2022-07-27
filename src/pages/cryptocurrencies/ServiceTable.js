import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { Table, Popover } from 'antd'
import { EllipsisOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { SKIP, CURRENCY } from '../../constants/params'
import Chart from './Chart'
// import { getDataDemo } from '../../api/dataDemo'
import axios from 'axios'
import _ from 'lodash'
const { TabPane } = Tabs

const ServiceTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState(['rank', 'name', 'price', 'marketCap', 'prices.volume_24h', 'priceChange1w', 'priceChange7d', 'priceGraph', 'priceChange24h', 'priceChange1h'])
  const [data, setData] = useState([])
  const [params, setParams] = useState({
    skip: SKIP,
    limit: 10,
    currency: CURRENCY
  })
  const [statusReload, setStatusReload] = useState(false)

  const getData = async() => {
    // const res = await getDataDemo('coins', params)
    axios.get('/coinPrice/coins/info').then(res => setData(res.data?.data)).catch(error => error)
    // setData(res.coins)
  }

  useEffect(() => {
    getData()
    setStatusReload(true)
  }, [params])

  useEffect(() => {
    const timer = setInterval(() => {
      getData()
      setStatusReload(true)
    }, 60000)
    return () => clearTimeout(timer)
  }, [])

  const columnsPopover = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '85%',
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>{record.title}</span>)
    }
  ]

  const items = [
    {
      key: 'rank',
      title: '#'
    },
    {
      key: 'name',
      title: 'Name'
    },
    {
      key: 'priceChange1h',
      title: '1h Change'
    },
    {
      key: 'priceChange24h',
      title: 'Change (24h)'
    },
    {
      key: 'priceChange7d',
      title: '7d Change'
    },
    {
      key: 'price',
      title: 'Price'
    },
    {
      key: 'priceBtc',
      title: 'Price in BTC'
    },
    {
      key: 'marketCap',
      title: 'Market Cap'
    },
    {
      key: 'prices.volume_24h',
      title: 'Volumn 24h'
    },
    {
      key: 'priceGraph',
      title: 'Price Graph (7d)'
    }
  ]

  const onSelectChange = (newselectedRowKeys) => {
    setSelectedRowKeys(newselectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const columns = [
    {
      title: '#',
      sorter: (a, b) => a.rank - b.rank,
      width: '20px',
      hidden: !selectedRowKeys.includes('rank'),
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>{record.rank}</span>)
    },
    {
      title: <span style={{ textAlign: 'left !important' }}>Name</span>,
      className: 'table-name',
      width: '250px',
      hidden: !selectedRowKeys.includes('name'),
      sorter: (a, b) => a.name - b.name,
      render: (_, record) => (<div>
        <div className='table-icon-coin'>
          {/* <img src={record.icon} alt='avatar-coin'/> */}
        </div>
        <div className='table-name-content'>
          <div className='table-name-text'>{record.coin_name}</div>
          <div className='table-name-symbol'>{record.coin_symbol}</div>
        </div>
      </div>)
    },
    {
      title: '1h Change',
      width: '120px',
      hidden: !selectedRowKeys.includes('priceChange1h'),
      render: (_, record) => (
        <div
          style={{
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: record.prices.percent_change_1h >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255,53,53,0.1)',
            color: record.prices.percent_change_1h >= 0 ? '#34b349' : '#ff4d4d',
            fontWeight: 'bold',
            width: 'fit-content',
            marginLeft: 'auto'
          }}
        >
          {record.prices.percent_change_1h >= 0 ? <CaretUpOutlined/> : <CaretDownOutlined/>}
          {parseInt(record.prices.percent_change_1h >= 0 ? record.prices.percent_change_1h : record.prices.percent_change_1h.toString().slice(1)).toFixed(2)} %
        </div>
      ),
      sorter: (a, b) => a.prices.percent_change_1h - b.prices.percent_change_1h
    },
    {
      title: 'Change (24h)',
      sorter: (a, b) => a.prices.percent_change_24h - b.prices.percent_change_24h,
      width: '120px',
      hidden: !selectedRowKeys.includes('priceChange24h'),
      render: (_, record) => (
        <div
          style={{
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: record.prices.percent_change_24h >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255,53,53,0.1)',
            color: record.prices.percent_change_24h >= 0 ? '#34b349' : '#ff4d4d',
            fontWeight: 'bold',
            width: 'fit-content',
            marginLeft: 'auto'
          }}
        >
          {record.prices.percent_change_24h >= 0 ? <CaretUpOutlined/> : <CaretDownOutlined/>}
          {parseInt(record.prices.percent_change_24h >= 0 ? record.prices.percent_change_24h : record.prices.percent_change_24h.toString().slice(1)).toFixed(2)} %
        </div>
      )
    },
    {
      title: '7d Change',
      sorter: (a, b) => a.prices.percent_change_7d - b.prices.percent_change_7d,
      width: '120px',
      hidden: !selectedRowKeys.includes('priceChange7d'),
      render: (_, record) => (
        <div
          style={{
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: record.prices.percent_change_7d >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255,53,53,0.1)',
            color: record.prices.percent_change_7d >= 0 ? '#34b349' : '#ff4d4d',
            fontWeight: 'bold',
            width: 'fit-content',
            marginLeft: 'auto'
          }}
        >
          {record.prices.percent_change_7d >= 0 ? <CaretUpOutlined/> : <CaretDownOutlined/>}
          {parseInt(record.prices.percent_change_7d >= 0 ? record.prices.percent_change_7d : record.prices.percent_change_7d.toString().slice(1)).toFixed(2)} %
        </div>
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '150px',
      sorter: (a, b) => a.prices.price - b.prices.price,
      hidden: !selectedRowKeys.includes('price'),
      render: (_, record) => (<span style={{ color: '#fff', fontWeight: '500' }}>
        $ {record.prices.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
      </span>)
    },
    // {
    //   title: 'Price in BTC',
    //   sorter: (a, b) => a.priceBtc - b.priceBtc,
    //   hidden: !selectedRowKeys.includes('priceBtc'),
    //   width: '120px',
    //   render: (_, record) => (<span style={{ color: '#A8ADB3' }}>
    //     {record.priceBtc.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
    //   </span>)
    // },
    {
      title: 'Market Cap',
      sorter: (a, b) => a.prices.market_cap - b.prices.market_cap,
      width: '120px',
      hidden: !selectedRowKeys.includes('prices.market_cap'),
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>
        $ {(record.prices.market_cap / 1000000000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} B
      </span>)
    },
    {
      title: 'Volumn 24h',
      sorter: (a, b) => a.prices.volume_24h - b.prices.volume_24h,
      width: '120px',
      hidden: !selectedRowKeys.includes('prices.volume_24h'),
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>
        $ {(record.prices.volume_24h / 1000000000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} B
      </span>)
    },
    {
      title: 'Price Graph (7d)',
      dataIndex: 'priceGraph',
      width: '120px',
      className: 'table-graph',
      hidden: !selectedRowKeys.includes('priceGraph'),
      // sorter: (a, b) => a.priceGraph - b.priceGraph,
      render: (_, record) => (<Chart record={record && record.price_chart_7d} statusReload={statusReload} setStatusReload={setStatusReload}/>)
    },
    {
      title: <Popover
        placement='bottomRight'
        content={(<Table
          showHeader={false}
          scroll={{
            y: 260
          }}
          style={{ maxWidth: '290px' }}
          className='tableabc'
          rowSelection={rowSelection}
          pagination={false}
          columns={columnsPopover}
          dataSource={items}
        ></Table>)}
        trigger='click'
      >
        +
      </Popover>,
      className: 'table-plus',
      width: '20px',
      dataIndex: 'key',
      render: (_, record) => (
        <Popover
          placement='bottomRight'
          content={(<Table
            showHeader={false}
            scroll={{
              y: 260
            }}
            style={{ maxWidth: '290px' }}
            className='tableabc'
            rowSelection={rowSelection}
            pagination={false}
            columns={columnsPopover}
            dataSource={items}
          ></Table>)}
          trigger='click'
        >
          <EllipsisOutlined className='table-row-item-icon' style={{ color: '#fff', fontSize: '20px' }}/>
        </Popover>
      )
    }
  ].filter(item => !item.hidden)

  const handleChangePage = (page, pageSize) => {
    setParams({
      ...params,
      skip: ((page - 1) * pageSize)
    })
  }

  return (
    <Tabs defaultActiveKey='1' style={{ padding: '40px 0' }}>
      <TabPane tab='Cryptocurrencies' key='1'>
        <Table
          columns={columns}
          dataSource={!_.isEmpty(data) && data}
          scroll={{
            x: 'max-content'
          }}
          showSorterTooltip={false}
          pagination={{
            position: ['bottomCenter'],
            total: 1000,
            defaultCurrent: 1,
            defaultPageSize: 100,
            showSizeChanger: false,
            onChange: handleChangePage
          }}
        />
      </TabPane>
      <TabPane tab='Exchanges' key='2'>
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab='Favorites' key='3'>
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab='DeFi' key='4'>
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab='Heatmap' key='5'>
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  )
}

export default ServiceTable
