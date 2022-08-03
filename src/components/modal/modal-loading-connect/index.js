import React from 'react'
import { Modal } from 'antd'
import { Typography, Button, Space, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography

// import ModalContent from './ModalContent'
const { Text } = Typography

const ModalLoadingConnect = ({ isModalLoading, setIsModalLoading, setIsModalSuccess, errorMessage }) => {
  // const dispatch = useDispatch()

  const navigate = useNavigate()
  const handleOk = () => {
    setIsModalLoading(false)
  }

  const handleCancel = () => {
    setIsModalLoading(false)
  }

  const handleClickSkip = () => {
    // setIsModalSuccess(true)
    // setIsModalLoading(false)
    navigate('../portfolio')
  }

  return (
    <Modal
      visible={isModalLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className='modal-style'
      bodyStyle={{ height: '50vh', overflow: 'hidden' }}
      width={520}
    >
      <Title style={{ fontSize: '28px', color: '#fff', fontWeight: '600', textAlign: 'center' }}>
        It May Take a Few Seconds to Connect Bitcoin Wallet to CoinStats
      </Title>
      <div>
        waitting...
      </div>
      {errorMessage !== ''
        ? <Typography className='message-error'>
          <Text type='danger'>{errorMessage && errorMessage}</Text>
        </Typography>
        : ''
      }
      <div>
        <Space size='middle'>
          <Spin size='large' />
        </Space>
      </div>
      <Button className='button' onClick={handleClickSkip}>SKIP</Button>
    </Modal>
  )
}
export default ModalLoadingConnect
