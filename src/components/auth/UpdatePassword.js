import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { updatePassword } from '../../redux/profileSlice'
import { validatePassword } from '../../utils/regex'
// import { getCookie, STORAGEKEY } from '../../utils/storage'

const layout = {
  labelCol: {
    span: 3
  }
}

const UpdatePassword = () => {
  const dispatch = useDispatch()
  const updatePasswordSubmit = (value) => {
    // const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
    // const passwords = value.user
    const data = {
      email: value.email,
      password: value.password,
      newPassword: value.newPassword
    }
    dispatch(updatePassword(data))
  }

  return (
    <Form {...layout} name='nest-message' onFinish={updatePasswordSubmit} >
      <Form.Item
        name={['user', 'email']}
        label='Email'
        rules={[
          {
            required: true
          }
        ]}>
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
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type='primary' htmlType='submit'>
        Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UpdatePassword
