import React from 'react'
import { Modal, Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const ModalSuccessConnect = ({ isModalSuccess, setIsModalSuccess, message }) => {
  const navigate = useNavigate()

  const handleClickSeePortfolio = () => {
    navigate('../portfolio')
  }

  return (
    <Modal
      className='reset-password-modal'
      visible={isModalSuccess}
      onOk={() => setIsModalSuccess(false)}
      onCancel={() => setIsModalSuccess(false)}
      footer={null}
    >
      <Result
        status='success'
        title={message}
        extra={[
          <Button className='button' onClick={handleClickSeePortfolio} key='submit'>
            SEE MY ANALYTICS
          </Button>
        ]}
      />
    </Modal>
  )
}
export default ModalSuccessConnect
