import React from 'react'
import { Modal } from 'antd'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'
import ModalFooter from './ModalFooter'
import './style.scss'

const ModalConnect = ({ isModalVisible, setIsModalVisible }) => {
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <Modal
      visible={isModalVisible}
      className='modal-connect'
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{ height: '100vh', overflow: 'hidden' }}
      width={830}
    >
      <ModalHeader />
      <ModalContent />
      <ModalFooter setIsModalVisible={setIsModalVisible}/>
    </Modal>
  )
}
export default ModalConnect
