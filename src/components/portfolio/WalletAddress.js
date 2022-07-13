import React, { useState, useEffect } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Row, Collapse, Tabs, Divider, Input } from 'antd'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllConnection, deleteConnection } from '../../redux/addressSlice'
import ModalContent from '../modal/connect-portfolio'
import ModalEdit from '../modal/modal-edit'
import { SUCCESS_DELETE_CONNECTION } from '../../constants/StatusMessageConstants'
const { TabPane } = Tabs
const WalletAddress = () => {
  const onSearch = (value) => console.log(value)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState(false)
  const dispatch = useDispatch()
  const { list_connection, status } = useSelector(state => state.connections)
  const { Search } = Input

  const handleConnectPortfolio = () => {
    setIsModalVisible(true)
  }

  console.log(list_connection)
  useEffect(() => {
    dispatch(getAllConnection())
  }, [dispatch, isModalEdit, status === SUCCESS_DELETE_CONNECTION])

  const handleTabClick = (e) => {
    console.log(e)
  }

  const handleDeleteAddress = (id) => {
    console.log(id)
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
          <Collapse className='panel' ghost defaultActiveKey={['1']}>
            <TabPane tab='All Assets' key='all' />
            <Tabs tabPosition='left' onTabClick={handleTabClick}>
              {list_connection && list_connection.map((item) => (
                <TabPane
                  tab={
                    <div>
                      {item.connectionName}
                      <DeleteOutlined onClick={() => handleDeleteAddress(item.id)}/>
                      <EditOutlined onClick={() => handleEditAddress(item)}/>
                    </div>
                  }
                  key={item.id}
                />
              ))}
            </Tabs>
          </Collapse>
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
