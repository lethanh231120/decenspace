import React from 'react'
import { Modal } from 'antd'
import { Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography

// import ModalContent from './ModalContent'

const ModalLoadingConnect = ({ isModalLoading, setIsModalLoading, setIsModalSuccess }) => {
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
      // width={type === PORTFOLIO_CONNECT ? 830 : type === SUCCESS_CONNECT ? 400 : 520}
    >
      <Title style={{ fontSize: '28px', color: '#fff', fontWeight: '600', textAlign: 'center' }}>
        It May Take a Few Seconds to Connect Bitcoin Wallet to CoinStats
      </Title>
      <div>
        waitting...
      </div>
      <Button className='button' onClick={handleClickSkip}>SKIP</Button>
    </Modal>
  )
}
export default ModalLoadingConnect
