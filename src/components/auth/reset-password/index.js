import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { validatePassword } from '../../../utils/regex'
// import { useDispatch } from 'react-redux'
// import { updatePassword } from '../../../redux/profileSlice'
import axios from 'axios'

export default function ResetPassword() {
  const [message, setMessage] = useState()
  const queryParams = new URLSearchParams(window.location.search)
  const uuid = queryParams.get('uuid')
  const token = queryParams.get('token')

  console.log(uuid)
  console.log(token)
  const resetPasswordSubmit = async(value) =>{
    const instance = axios.create({
      baseURL: '/accountService'
    })
    if (token) {
      instance.defaults.headers.common['Authorization'] = token
    }
    try {
      const res = await instance.patch(`/accounts/forgot-password/uuid=${uuid}`, { newPassword: value.user.newPassword })
      setMessage(res?.message)
    } catch (error) {
      setMessage(error?.response?.data?.message)
      console.log(error?.response?.data?.message)
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
          {message && message}
        </div>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type='primary' htmlType='submit'>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
