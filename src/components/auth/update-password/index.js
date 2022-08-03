import React, { useState } from 'react'
import { Button, Form, Input, Modal, Result, Typography } from 'antd'
import { patch } from '../../../api/accountService'
import { validatePassword } from '../../../utils/regex'
import { accountChangePassStatus } from '../../../constants/statusCode'

const { Text } = Typography
const UpdatePassword = ({ setIsModalPasswordUpdate }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState()
  const [openModalNoti, setOpanModalNoti] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const updatePasswordSubmit = async(value) => {
    try {
      setLoading(true)
      const data = {
        email: value.user.email,
        password: value.user.password,
        newPassword: value.user.newPassword
      }
      const res = await patch('accounts/change-password', data)
      res && accountChangePassStatus.map((item) => {
        if (res.code === item.code) {
          setMessage(item.message)
          setOpanModalNoti(true)
          setIsModalPasswordUpdate(false)
          setLoading(false)
        }
      })
    } catch (error) {
      error?.response?.data && setErrorMessage(accountChangePassStatus.map((item) => {
        if (item.code === error.response.data.code) {
          return item.message
        }
      }))
      setLoading(false)
    }
  }

  return (
    <>
      <Form name='nest-message' layout='vertical' onFinish={updatePasswordSubmit} >
        <Form.Item
          name={['user', 'email']}
          label='Email'
          rules={[{ required: true }]}>
          <Input/>
        </Form.Item>
        <Form.Item
          name={['user', 'password']}
          label='Old Password'
          rules={[
            {
              required: true,
              message: 'Please input your old password!'
            }
          ]}>
          <Input.Password/>
        </Form.Item>
        <Form.Item
          name={['user', 'newPassword']}
          label='New Password'
          rules={[
            {
              required: true,
              message: 'Please input your new password! '
            },
            {
              message: 'Your password must have atleast 8 characters with 1 Upper Case character',
              pattern: new RegExp(validatePassword)
            }
          ]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item
          name={['user', 'confirmPassword']}
          label='Confirm Password'
          dependencies={['user', 'newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(['user', 'newPassword']) === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              }
            })
          ]}
        >
          <Input.Password/>
        </Form.Item>
        {errorMessage !== ''
          ? <Typography className='message-error'>
            <Text type='danger'>{errorMessage && errorMessage}</Text>
          </Typography>
          : ''
        }
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
          Submit
          </Button>
        </Form.Item>
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
    </>
  )
}

export default UpdatePassword
