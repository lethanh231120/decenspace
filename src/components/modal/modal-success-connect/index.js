import React from 'react'
import { Modal, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const ModalSuccessConnect = ({ isModalSuccess, setIsModalSuccess }) => {
  const navigate = useNavigate()

  const handleOk = () => {
    setIsModalSuccess(false)
  }

  const handleCancel = () => {
    setIsModalSuccess(false)
  }

  const handleClickSeePortfolio = () => {
    navigate('../portfolio')
  }

  return (
    <Modal
      visible={isModalSuccess}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className='modal-style'
      bodyStyle={{ height: '50vh', overflow: 'hidden' }}
      width={400}
    >
      <div>SUCCESS</div>
      <Button className='button' onClick={handleClickSeePortfolio}>
        SEE MY ANALYTICS
      </Button>
    </Modal>
  )
}
export default ModalSuccessConnect
