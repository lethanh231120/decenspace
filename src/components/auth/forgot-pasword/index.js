import { Form, Input, Button, Modal } from 'antd'
import React, { useState } from 'react'
import { validateEmail } from '../../../utils/regex'
import ResetPassword from '../reset-password'
import { useNavigate } from 'react-router-dom'
import { post } from '../../../api/mailService'
import './style.scss'
const ForgotPassword = ({ setIsModalForgotPassword }) => {
  const navigate = useNavigate()
  const [isModalResetPassword, setIsModalResetPassword] = useState(false)

  const onFinish = async(values) => {
    const res = await post('mails/forgot-password', values)
    console.log(res)
    setIsModalForgotPassword(false)
    navigate('../forgot-password')
    // setIsModalResetPassword(true)
  }

  return (
    <div>
      <Form
        name='basic'
        initialss={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label='email'
          name='email'
          rules={[
            {
              required: false,
              type: 'email',
              message: 'Enter a valid email address!',
              pattern: new RegExp(validateEmail)
            }
          ]}
        >
          <Input placeholder='test@gmail.com' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Send
          </Button>
        </Form.Item>
      </Form>
      <Modal
        className='reset-password-modal'
        visible={isModalResetPassword}
        onOk={() => setIsModalResetPassword(false)}
        onCancel={() => setIsModalResetPassword(false)}
        footer={null}
      >
        <ResetPassword setIsModalResetPassword={setIsModalResetPassword} />
      </Modal>
    </div>
  )
}

export default ForgotPassword
