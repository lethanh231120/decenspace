import React, { useState } from 'react'
import { Form, Input, Button, Modal, Result } from 'antd'
import { validatePassword } from '../../../utils/regex'
import { accountForgotPassStatus } from '../../../constants/statusCode'
import axios from 'axios'

export default function ResetPassword() {
  const [message, setMessage] = useState()
  const [openModalNoti, setOpenModalNoti] = useState(false)
  const [loading, setLoading] = useState(false)
  const queryParams = new URLSearchParams(window.location.search)
  const uuid = queryParams.get('uuid')
  const token = queryParams.get('token')

  const resetPasswordSubmit = async(value) =>{
    const instance = axios.create({
      baseURL: '/accountService'
    })
    if (token) {
      instance.defaults.headers.common['Authorization'] = token
    }
    try {
      setLoading(true)
      const res = await instance.patch(`/accounts/forgot-password/uuid=${uuid}`, { newPassword: value.user.newPassword })
      res && (accountForgotPassStatus.map((item) => {
        if (res.code === item.code) {
          setMessage({
            message: item.message
          })
          setOpenModalNoti(true)
          setLoading(false)
        }
      }))
    } catch (error) {
      setLoading(false)
      setMessage({
        error: error?.response?.data?.message
      })
    }
  }

  return (
    <div>
      <Form initialss={{ remember: true }} onFinish={resetPasswordSubmit}>
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
        <div style={{ color: 'red' }}>
          {message?.error && message?.error}
        </div>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type='primary' htmlType='submit' loading={loading}>
            Send
          </Button>
        </Form.Item>
      </Form>
      <Modal
        className='reset-password-modal'
        visible={openModalNoti}
        onOk={() => setOpenModalNoti(false)}
        onCancel={() => setOpenModalNoti(false)}
      >
        <Result
          status='success'
          title={message?.message}
        />
      </Modal>
    </div>
  )
}
