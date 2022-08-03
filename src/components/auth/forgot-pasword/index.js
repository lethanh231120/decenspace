import { Form, Input, Button, Modal, Typography, Result } from 'antd'
import React, { useState } from 'react'
import { validateEmail } from '../../../utils/regex'
import { post } from '../../../api/mailService'
import { mailForgotPassStatus } from '../../../constants/statusCode'
const { Text } = Typography

const ForgotPassword = ({ setIsModalForgotPassword }) => {
  const [errorMessage, setErrorMessage] = useState()
  const [message, setMessage] = useState()
  const [openModalNoti, setOpanModalNoti] = useState(false)
  const [loading, setLoading] = useState(false)
  const onFinish = async(values) => {
    try {
      setLoading(true)
      const res = await post('mails/forgot-password', values)
      res && setMessage(mailForgotPassStatus.map((item) => {
        if (item.code === res.code) {
          return item.message
        }
      }))
      res && setOpanModalNoti(true)
      res && setIsModalForgotPassword(false)
      res && setLoading(false)
    } catch (error) {
      error?.response?.data && setErrorMessage(mailForgotPassStatus.map((item) => {
        if (item.code === error.response.data.code) {
          return item.message
        }
      }))
      setLoading(false)
    }
  }

  return (
    <div>
      <Form
        name='basic'
        initialss={{ remember: true }}
        onFinish={onFinish}
        onValuesChange = {() =>{
          setErrorMessage()
        }}
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
          <Button type='primary' htmlType='submit' loading={loading}>
            Send
          </Button>
        </Form.Item>
        {errorMessage !== ''
          ? <Typography className='message-error'>
            <Text type='danger'>{errorMessage && errorMessage}</Text>
          </Typography>
          : ''
        }
      </Form>
      <Modal
        className='reset-password-modal'
        visible={openModalNoti}
        onOk={() => setOpanModalNoti(false)}
        onCancel={() => setOpanModalNoti(false)}
      >
        <Result
          status='success'
          title={message}
        />
      </Modal>
    </div>
  )
}

export default ForgotPassword
