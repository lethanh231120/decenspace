import React, { useState } from 'react'
import { Button, Form, Input, Modal, Typography } from 'antd'
import { post } from '../../../api/accountService'
import { setCookie, STORAGEKEY } from '../../../utils/storage'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '../../../redux/useInfo'
import { useForm } from 'react-hook-form'
import { validateEmail, validatePassword } from '../../../utils/regex'
import ForgotPassword from '../forgot-pasword'
import './style.scss'
import { accountSigninStatus } from '../../../constants/statusCode'
const { Text } = Typography
export default function SignIn({ setIsModalSignin }) {
  const [isModalForgotPassword, setIsModalForgotPassword] = useState(false)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
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
      setLoading(true)
      const data = await post('accounts/signin', values, config)
      const token = data?.data?.token
      reset()
      if (token) {
        await setCookie(STORAGEKEY.ACCESS_TOKEN, token)
        await dispatch(getUserInfo())
        setLoading(false)
        setIsModalSignin(false)
      }
    } catch (error) {
      error?.response?.data && accountSigninStatus.map((item) => {
        if (item.code === error.response.data.code === 'B.ACC.400.C3') {
          console.log('dfsdfsdfsd')
          setError({
            error: item.message,
            message: 'Your account will be locked if you enter the wrong email or password more than 3 times'
          })
        }
        if (item.code === error.response.data.code === 'B.ACC.400.C4') {
          setError({
            error: item.message
          })
        }
        if (item.code === error.response.data.code === 'B.ACC.400.C5') {
          setError({
            error: item.message,
            message: 'Please contact with admin of NIKA.guru to open the account key'
          })
        }
      })
      setLoading(false)
    }
  }

  return (
    <div className='login-form'>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        initialss={{ remember: true }}
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          label='email'
          name='email'
          rules={[
            {
              required: true,
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
              message: 'Please! Password at least 8 characters. number(s) and letter (S)!',
              pattern: new RegExp(validatePassword)
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Text type='danger'>{error && error?.error}</Text>
        <Text type='danger'>{error && error?.message && error?.message}</Text>

        <Typography
          style={{ textAlign: 'right', color: '#000', cursor: 'pointer' }}
          onClick={() => setIsModalForgotPassword(true) || setIsModalSignin(false)}
        >
          Forgot Password ?
        </Typography>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
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
