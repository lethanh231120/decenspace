import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Row, Tabs, Divider, Input, Popconfirm } from 'antd'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { deleteConnectionBtc } from '../../redux/bitcoinSlice'
import ModalContent from '../modal/connect-portfolio'
import { deleteConnectionEvm } from '../../redux/evmSlice'
import ModalEdit from '../modal/modal-edit/Bitcoin'

const { TabPane } = Tabs
const WalletAddress = (props) => {
  const { holding_evm, setIsModalEdit, isModalEdit, connectionName, handleTabClick } = props
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [dataEdit, setDataEdit] = useState(false)
  // const [searchFilter, setSearchFilter] = useState('')
  const dispatch = useDispatch()
  const [filterConnection, setFilterConnection] = useState()
  const { Search } = Input

  const handleConnectPortfolio = () => {
    setIsModalVisible(true)
  }

  useEffect(() => {
    setFilterConnection(holding_evm)
  }, [holding_evm])

  const onChange = (value) => {
    setFilterConnection(holding_evm && holding_evm.filter((item) => {
      return item.connection.connectionName.toLowerCase().includes(value.toLowerCase())
    }))
  }

  // const filterConnection = list_connection?.filter((item)=>{
  //   return item.connectionName.toLowerCase().includes(searchFilter.toLowerCase())
  // })
  // const connectionEvm = holding_evm && holding_evm.filter((item) => {
  //   return item.connection.connectionName.toLowerCase().includes(searchFilter.toLowerCase())
  // })

  const handleDeleteAddress = (id, chain) => {
    console.log(id, chain)
    if (chain === 'evm') {
      // dispatch(deleteConnectionEvm(id))
    }
    if (chain === 'btc') {
      // dispatch(deleteConnectionBtc(id))
    }
  }

  console.log(filterConnection)
  const handleEditAddress = (item) => {
    setIsModalEdit(true)
    setDataEdit(item)
  }

  return (
    <div className='sidebar'>
      <Row>
        <Col span={24}>
          <Button onClick={handleConnectPortfolio}>CONNECT PORTFOLIO</Button>
        </Col>
        <Divider />
        <Search
          placeholder= 'input search text'
          onChange={(e) => onChange(e.target.value)}
        />
        <Col span={24}>
          <Tabs tabPosition='right' onTabClick={handleTabClick} value={connectionName}>
            <TabPane tab='All Assets' key='all' style={{ textAlign: 'left', width: '100%' }}/>
            {/* {filterConnection && filterConnection.map((item) => (
              <TabPane
                tab={
                  <div className='tab-list-item'>
                    {item.connectionName}
                    <div className='tab-list-icon'>
                      <Popconfirm
                        placement='top'
                        className='popover'
                        title='Are you sure to delete this connection?'
                        onConfirm={() => handleDeleteAddress(item.id, 'btc')}
                        okText='Yes'
                        cancelText='No'
                      >
                        <DeleteOutlined className='tab-list-icon-item' />
                      </Popconfirm>
                      <EditOutlined className='tab-list-icon-item' onClick={() => handleEditAddress(item)}/>
                    </div>
                  </div>
                }
                key={item.id}
              />
            ))} */}
            {filterConnection && filterConnection.length > 0 && filterConnection.map((item) => (
              <TabPane
                tab={
                  <div className='tab-list-item'>
                    {item.connection.connectionName}
                    <div className='tab-list-icon'>
                      <Popconfirm
                        placement='top'
                        className='popover'
                        title='Are you sure to delete this connection?'
                        onConfirm={() => handleDeleteAddress(item.connection.id, 'evm')}
                        okText='Yes'
                        cancelText='No'
                      >
                        <DeleteOutlined className='tab-list-icon-item' />
                      </Popconfirm>
                      <EditOutlined className='tab-list-icon-item' onClick={() => handleEditAddress(item)}/>
                    </div>
                  </div>
                }
                key={item.connection.id}
              />
            ))}
          </Tabs>
        </Col>
      </Row>
      <ModalContent
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <ModalEdit
        isModalEdit={isModalEdit}
        setIsModalEdit={setIsModalEdit}
        dataEdit={dataEdit}
      />
    </div>
  )
}

export default WalletAddress
