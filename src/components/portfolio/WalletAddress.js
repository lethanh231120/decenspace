import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Collapse, Tabs, Divider, Input } from 'antd'
import { } from '@ant-design/icons'
import './styles.scss'
import { PORTFOLIO_CONNECT } from '../../constants/TypeConstants'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAddress } from '../../redux/addressSlice'
import ModalContent from '../modal/connect-portfolio'

const { TabPane } = Tabs
// const { Link } = Typography
const WalletAddress = () => {
  const onSearch = (value) => console.log(value)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [type, setType] = useState(PORTFOLIO_CONNECT)
  const dispatch = useDispatch()

  const { Search } = Input

  const { list_address } = useSelector(state => state.address)

  console.log(list_address)
  const handleConnectPortfolio = () => {
    setIsModalVisible(true)
  }

  useEffect(() => {
    dispatch(getAllAddress())
  }, [dispatch])

  const handleTabClick = (e) => {
    console.log(e)
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
            {/* <Panel header='Assets' key='1'> */}
            {/* <Link to='#'>Address 1</Link>
              <Link to='#'>Address 2</Link>
              <Link to='#'>Address 3</Link> */}
            <TabPane tab='All Assets' key='all' />
            <Tabs tabPosition='left' onTabClick={handleTabClick}>
              {list_address && list_address.map((item) => (
                <TabPane tab={item.connectionName} key={item.id} />
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
        type={type}
        setType={setType}
      />
    </div>
  )
}

export default WalletAddress
