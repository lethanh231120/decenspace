import { Form, Input, Button, Modal } from 'antd'
import React, { useState } from 'react'
import { validateEmail } from '../../../utils/regex'
import ResetPassword from '../reset-password'
import './style.scss'
const ForgotPassword = ({ setIsModalForgotPassword }) => {
  const [isModalResetPassword, setIsModalResetPassword] = useState(false)
  const onFinish = (values) =>{
    alert(`Reset Password Mail has been sent to your gmail: ${values.email}. Pls check your email and reset your password`)
    setIsModalForgotPassword(false)
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
          <Input placeholder='test@gmail.com'/>
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
        <ResetPassword setIsModalResetPassword={setIsModalResetPassword}/>
      </Modal>
    </div>
  )
}

export default ForgotPassword
