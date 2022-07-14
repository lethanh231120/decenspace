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
import { SUCCESS_REQUEST } from '../../../constants/statusCode'

const { Text } = Typography
export default function SignIn({ setIsModalSignin }) {
  const [isModalForgotPassword, setIsModalForgotPassword] = useState(false)
  const [error, setError] = useState()
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
      const data = await post('accounts/signin', values, config)
      const token = data?.data?.token
      reset()
      if (token) {
        await setCookie(STORAGEKEY.ACCESS_TOKEN, token)
        await dispatch(getUserInfo())
        setIsModalSignin(false)
      }
    } catch (error) {
      error?.response?.data && setError(error.response.data.code !== SUCCESS_REQUEST && 'Incorrect email or password')
    }
  }

  return (
    <div>
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
        <Text type='danger'>{error && error}</Text>

        <Typography
          style={{ textAlign: 'right', color: '#000', cursor: 'pointer' }}
          onClick={() => setIsModalForgotPassword(true) || setIsModalSignin(false)}
        >
          Quên mật khẩu?
        </Typography>
        {/* {error && error} */}
        <Form.Item>
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
