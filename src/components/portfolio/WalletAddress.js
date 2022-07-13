import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Collapse, Tabs } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllConnection, deleteConnection } from '../../redux/addressSlice'
import ModalContent from '../modal/connect-portfolio'
import ModalEdit from '../modal/modal-edit'
import { SUCCESS_DELETE_CONNECTION } from '../../constants/StatusMessageConstants'
const { TabPane } = Tabs
const WalletAddress = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState(false)
  const dispatch = useDispatch()
  const { list_connection, status } = useSelector(state => state.connections)

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
              {/* <TabPane tab='Tab 1' key='1' />
              <TabPane tab='Tab 2' key='2' />
              <TabPane tab='Tab 3' key='3' /> */}
            </Tabs>
            {/* </Panel> */}
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
