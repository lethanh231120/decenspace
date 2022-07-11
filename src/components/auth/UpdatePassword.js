import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { updatePassword } from '../../redux/profileSlice'
import { validatePassword } from '../../utils/regex'

const layout = {
  labelCol: {
    span: 3
  }
}

const UpdatePassword = () => {
  const dispatch = useDispatch()
  const updatePasswordSubmit = (value) => {
    const passwords = value.user
    dispatch(updatePassword(passwords))
  }

  return (
    <Form {...layout} name='nest-message' onFinish={updatePasswordSubmit} >
      <Form.Item
        name={['user', 'oldPassword']}
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
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type='primary' htmlType='submit'>
        Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UpdatePassword
