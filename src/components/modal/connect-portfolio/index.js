import React, { memo } from 'react'
import { Modal } from 'antd'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'
import ModalFooter from './ModalFooter'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const ModalConnect = ({ isModalVisible, setIsModalVisible }) => {
  const navigate = useNavigate()
  const handleClose = () => {
    setIsModalVisible(false)
    navigate('../')
  }
  return (
    <Modal
      visible={isModalVisible}
      className='modal-connect'
      onOk={handleClose}
      onCancel={handleClose}
      footer={null}
      bodyStyle={{ overflow: 'hidden' }}
      width={830}
    >
      <ModalHeader />
      <ModalContent />
      <ModalFooter />
    </Modal>
  )
}
export default memo(ModalConnect)
