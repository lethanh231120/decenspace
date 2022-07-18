import React, { useState, useEffect } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Row, Tabs, Divider, Input, Popconfirm } from 'antd'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { getAllConnection, deleteConnection } from '../../redux/addressSlice'
import ModalContent from '../modal/connect-portfolio'
import ModalEdit from '../modal/modal-edit'
import { SUCCESS_DELETE_CONNECTION } from '../../constants/StatusMessageConstants'
const { TabPane } = Tabs
const WalletAddress = ({ list_connection, status }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')
  const dispatch = useDispatch()
  // const { list_connection, status } = useSelector(state => state.connections)
  const { Search } = Input

  console.log(status)
  const handleConnectPortfolio = () => {
    setIsModalVisible(true)
  }

  const onSearch = (value) => setSearchFilter(value)
  const filterConnection = list_connection?.filter((item)=>{
    return item.connectionName.toLowerCase().includes(searchFilter.toLowerCase())
  })

  useEffect(() => {
    dispatch(getAllConnection())
  }, [dispatch, isModalEdit, status === SUCCESS_DELETE_CONNECTION])

  const handleTabClick = (e) => {
    // console.log(e)
  }

  const handleDeleteAddress = (id) => {
    dispatch(deleteConnection(id))
  }

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
          onSearch={onSearch}
        />
        <Col span={24}>
          <Tabs tabPosition='right' onTabClick={handleTabClick}>
            <TabPane tab='All Assets' key='all' style={{ textAlign: 'left', width: '100%' }}/>
            {filterConnection && filterConnection.map((item) => (
              <TabPane
                tab={
                  <div className='tab-list-item'>
                    {item.connectionName}
                    <div className='tab-list-icon'>
                      <Popconfirm
                        placement='top'
                        title='Are you sure to delete this connection?'
                        onConfirm={() => handleDeleteAddress(item.id)}
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
