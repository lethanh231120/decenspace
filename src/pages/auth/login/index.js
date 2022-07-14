import React, { useState } from 'react'
import { Button, Form, Input, Modal, Typography } from 'antd'
import { post } from '../../../api/accountService'
import { setCookie, STORAGEKEY } from '../../../utils/storage'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '../../../redux/useInfo'
// import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { validateEmail } from '../../../utils/regex'
import ForgotPassword from '../../../components/auth/ForgotPassword'
import './styles.scss'
// import axios from 'axios'

export default function SignIn({ setIsModalSignin }) {
  const [isModalForgotPassword, setIsModalForgotPassword] = useState(false)
  const [error, setError] = useState()
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const {
    reset
  } = useForm({
    mode: 'onChange'
  })
  const onFinish = async(values) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const data = await post('accounts/signin', values, config)
      const token = data?.data?.token
      reset()
      if (token) {
        await setCookie(STORAGEKEY.ACCESS_TOKEN, token)
        await dispatch(getUserInfo())
        setIsModalSignin(false)
        // if (data.isAdmin === true) {
        // //   navigate('../admin')
        // } else {
        //   navigate('../')
        // }
      }
    } catch (error) {
      error?.response?.data && setError(error.response.data.message)
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
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
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Mật khẩu bao gồm cả chữ hoa, chữ thường, số và ít nhất 8 kỹ tự!'
              // pattern: new RegExp(validatePassword)
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Typography
          style={{ textAlign: 'right', color: '#ffffff' }}
          onClick={() => setIsModalForgotPassword(true) || setIsModalSignin(false)}
        >
          Quên mật khẩu?
        </Typography>
        {error && error}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        className='forgot-password-modal'
        visible={isModalForgotPassword}
        onOk={() => setIsModalForgotPassword(false)}
        onCancel={() => setIsModalForgotPassword(false)}
        footer={null}
      >
        <ForgotPassword setIsModalForgotPassword={setIsModalForgotPassword}/>
      </Modal>
    </div>
  )
}
