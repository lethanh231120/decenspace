import React from 'react'
import { Form, Input, Button } from 'antd'
import { validatePassword } from '../../utils/regex'
import { useDispatch } from 'react-redux'
import { updatePassword } from '../../redux/profileSlice'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const resetPasswordSubmit = (value) =>{
    const passwords = value.user
    dispatch(updatePassword(passwords))
  }

  return (
    <div>
      <Form
        name='basic'
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        initialss={{
          remember: true
        }}
        onFinish={resetPasswordSubmit}
      >
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

export default ResetPassword
