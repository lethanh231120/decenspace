import React, { useState, useEffect } from 'react'
import { Tabs, Table, Popover } from 'antd'
import { EllipsisOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
// import { EllipsisOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import '../../portfolio/styles.scss'
// import { EXCHANGE } from '../../constants/TypeConstants'
// import { get } from '../../api/addressService'
import { EXCHANGE } from '../../../constants/TypeConstants'
import { ListNFT } from '../../nft-evm/ListNFT'
const { TabPane } = Tabs
const Holdings = ({ dataConnection, isGroupNFT, setIsGroupNFT, isLoading }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState(['rank', 'name', 'price', 'marketCap', 'volume', 'priceChange1w', 'priceChange7d', 'priceGraph', 'priceChange24h', 'priceChange1h'])
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
      key: 'amount',
      title: 'Amount'
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
      key: 'volume',
      title: 'Volumn 24h'
    },
    {
      key: 'priceGraph',
      title: 'Price Graph (7d)'
    }
  ]

  const [data, setData] = useState([])
  useEffect(() => {
    setData(dataConnection && dataConnection?.holdings)
  }, [dataConnection])

  const onSelectChange = (newselectedRowKeys) => {
    setSelectedRowKeys(newselectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const columns = [
    {
      key: '#',
      title: '#',
      sorter: (a, b) => a.rank - b.rank,
      width: '20px',
      hidden: !selectedRowKeys.includes('rank'),
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}></span>)
    },
    {
      key: 'name',
      title: <span style={{ textAlign: 'left !important' }}>Name</span>,
      className: 'table-name',
      width: '250px',
      hidden: !selectedRowKeys.includes('name'),
      sorter: (a, b) => a.name - b.name,
      render: (_, record) => (<div>
        <div className='table-icon-coin'>
          <img src={record?.holding?.logo ? record?.holding?.logo : 'https://png.monster/wp-content/uploads/2022/02/png.monster-623.png'} alt='avatar-coin'/>
        </div>
        <div className='table-name-content'>
          <div className='table-name-text'>{record?.holding?.name ? record?.holding?.name : record?.holding?.coinName}</div>
          <div className='table-name-symbol'>{record?.holding?.symbol ? record?.holding?.symbol.toUpperCase() : record?.holding?.coinName === 'bitcoin' ? 'BTC' : ''}</div>
        </div>
      </div>)
    },
    {
      key: 'amount',
      title: <span style={{ textAlign: 'left !important' }}>Amount</span>,
      className: 'amount',
      width: '120px',
      hidden: !selectedRowKeys.includes('amount'),
      sorter: (a, b) => a.amount - b.amount,
      render: (_, record) => (<span style={{ color: '#fff', fontWeight: '500' }}>
        {record?.holding?.balance
          ? ((record?.holding?.balance) * (1 / Math.pow(10, (record?.holding?.decimals)))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          : ((record?.holding?.amount) * EXCHANGE).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }
      </span>)
    },
    {
      key: 'priceChange1h',
      title: '1h Change',
      width: '120px',
      hidden: !selectedRowKeys.includes('priceChange1h'),
      render: (_, record = '12') => (
        <div
          style={{
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: record.priceChange1h >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255,53,53,0.1)',
            color: record.priceChange1h >= 0 ? '#34b349' : '#ff4d4d',
            fontWeight: 'bold',
            width: 'fit-content',
            marginLeft: 'auto'
          }}
        >
          {/* {record?.priceChange1h >= 0
            ? <CaretUpOutlined/> : <CaretDownOutlined/>}
          {record?.priceChange1h >= 0 ? record.priceChange1h : record.priceChange1h.toString().slice(1)} % */}
          <CaretUpOutlined />
        </div>
      ),
      sorter: (a, b) => a.priceChange1h - b.priceChange1h
    },
    {
      key: 'priceChange24h',
      title: 'Change (24h)',
      sorter: (a, b) => a.priceChange1d - b.priceChange1d,
      width: '120px',
      hidden: !selectedRowKeys.includes('priceChange24h'),
      render: (_, record) => (
        <div
          style={{
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: record.priceChange1d >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255,53,53,0.1)',
            color: record.priceChange1d >= 0 ? '#34b349' : '#ff4d4d',
            fontWeight: 'bold',
            width: 'fit-content',
            marginLeft: 'auto'
          }}
        >
          {/* {record.priceChange1d >= 0 ?  */}
          <CaretUpOutlined/>
          {/* : <CaretDownOutlined/>} */}
          {/* {record.priceChange1d >= 0 ? record.priceChange1d : record.priceChange1d.toString().slice(1)} % */}
        </div>
      )
    },
    {
      key: 'priceChange1w',
      title: '7d Change',
      sorter: (a, b) => a.priceChange1w - b.priceChange1w,
      width: '120px',
      hidden: !selectedRowKeys.includes('priceChange7d'),
      render: (_, record) => (
        <div
          style={{
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: record.priceChange1w >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255,53,53,0.1)',
            color: record.priceChange1w >= 0 ? '#34b349' : '#ff4d4d',
            fontWeight: 'bold',
            width: 'fit-content',
            marginLeft: 'auto'
          }}
        >
          {/* {record.priceChange1w >= 0 ?  */}
          {/* <CaretUpOutlined/> :*/}
          <CaretDownOutlined/>
          {/* {record.priceChange1w >= 0 ? record.priceChange1w : record.priceChange1w.toString().slice(1)} % */}
        </div>
      )
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
      width: '150px',
      sorter: (a, b) => a.price - b.price,
      hidden: !selectedRowKeys.includes('price'),
      render: (_, record) => (<span style={{ color: '#fff', fontWeight: '500' }}>
        ${record?.coinPriceUSD ? record?.coinPriceUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : record?.coinPriceUSD}
      </span>)
    },
    {
      key: 'marketCap',
      title: 'Market Cap',
      sorter: (a, b) => a.marketCap - b.marketCap,
      width: '120px',
      hidden: !selectedRowKeys.includes('marketCap'),
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>
        {/* $ {(record.marketCap / 1000000000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} B */}
      </span>)
    },
    {
      key: 'volume',
      title: 'Volumn 24h',
      sorter: (a, b) => a.volume - b.volume,
      width: '120px',
      hidden: !selectedRowKeys.includes('volume'),
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>
        {/* $ {(record.volume / 1000000000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} B */}
      </span>)
    },
    {
      title: 'Price Graph (7d)',
      dataIndex: 'priceGraph',
      width: '120px',
      className: 'table-graph',
      //   hidden: selectedRowKeys.includes('priceGraph') ? false : true,
      sorter: (a, b) => a.priceGraph - b.priceGraph
    //   render: (_, record) => (<Chart record={record && record} status={status} setStatus={setStatus}/>)
    },
    {
      key: 'more',
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
        >
        </Table>)}
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
          >
          </Table>)}
          trigger='click'
        >
          <EllipsisOutlined className='table-row-item-icon' style={{ color: '#fff', fontSize: '20px' }}/>
        </Popover>
      )
    }
  ].filter(item => !item.hidden)

  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='Holdings' key='1'>
        <Table
          columns={columns}
          dataSource={data && data}
          scroll={{
            x: 'max-content'
          }}
          showSorterTooltip={false}
          pagination={false}
        />
      </TabPane>
      {(dataConnection && dataConnection?.nft[0]) ? (
        <TabPane tab='NFT' key='2'>
          <ListNFT
            dataConnection={dataConnection}
            isGroupNFT={isGroupNFT}
            setIsGroupNFT={setIsGroupNFT}
            isLoading={isLoading}
          />
        </TabPane>
      )
        : ''}
      <TabPane tab='Charts' key='3'>
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab='Transactions' key='4'>
        Content of Tab Pane 4
      </TabPane>
    </Tabs>
  )
}

export default Holdings
