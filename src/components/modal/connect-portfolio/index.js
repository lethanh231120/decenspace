import React from 'react'
import { Modal } from 'antd'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'
import ModalFooter from './ModalFooter'
import { PORTFOLIO_CONNECT, SUCCESS_CONNECT } from '../../../constants/TypeConstants'

const ModalConnect = ({ isModalVisible, setIsModalVisible, type, setType }) => {
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className={type === SUCCESS_CONNECT ? 'modal-style' : ''}
      closable={type === PORTFOLIO_CONNECT}
      bodyStyle={{ height: type === SUCCESS_CONNECT ? '50vh' : '100vh', overflow: 'hidden' }}
      width={type === PORTFOLIO_CONNECT ? 830 : type === SUCCESS_CONNECT ? 400 : 520}
    >
      <ModalHeader type={type}/>
      <ModalContent type={type}/>
      <ModalFooter type={type} setType={setType}/>
    </Modal>
  )
}
export default ModalConnect
