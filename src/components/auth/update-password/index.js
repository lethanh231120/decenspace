import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { updatePassword } from '../../../redux/profileSlice'
import { validatePassword } from '../../../utils/regex'

const UpdatePassword = ({ setIsModalPasswordUpdate }) => {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.profile)
  const updatePasswordSubmit = (value) => {
    const data = {
      email: value.user.email,
      password: value.user.password,
      newPassword: value.user.newPassword
    }
    dispatch(updatePassword(data))
  }

  useEffect(() => {
    setIsModalPasswordUpdate(false)
  }, [status === 'change password successfully'])

  return (
    <Form name='nest-message' layout='vertical' onFinish={updatePasswordSubmit} >
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
      <Form.Item>
        <Button type='primary' htmlType='submit'>
        Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UpdatePassword
