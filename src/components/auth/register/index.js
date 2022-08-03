import React, { useState, useEffect } from 'react'
import { Form, Input, Checkbox, Row, Col, Typography, notification, Modal } from 'antd'
import { post } from '../../../api/accountService'
import { SmileOutlined } from '@ant-design/icons'
import { validateEmail, validatePassword } from '../../../utils/regex'
import './style.scss'
import { accountSignupStatus } from '../../../constants/statusCode'
import SignIn from '../login'

const { Text } = Typography
export default function Signup({ setIsModalSignup }) {
  const [errorMessage, setErrorMessage] = useState()
  const [form] = Form.useForm()
  const [passwordValidate, setPasswordValidate] = useState([])
  const [passwordStrength, setPasswordStrength] = useState()
  const [checked, setChecked] = useState(false)
  const [isModalSignin, setIsModalSignin] = useState(false)
  const onFinish = async(values) => {
    const data = {
      email: values.user.email,
      password: values.user.password
    }
    try {
      const res = await post('accounts/signup', data)
      res && openNotification(accountSignupStatus.map((item) => {
        if (item.code === res.code) {
          return item.message
        }
      }))
      res && setIsModalSignup(false)
      res && setErrorMessage()
      res && setChecked(false)
      res && setPasswordStrength()
      form.resetFields()
    } catch (error) {
      error?.response?.data && setErrorMessage(accountSignupStatus.map((item) => {
        if (item.code === error.response.data.code) {
          return item.message
        }
      }))
    }
  }

  const handlePassword = (e) => {
    const password = e.target.value
    setPasswordValidate([
      {
        check: 'minChar',
        status: password.length > 7
      },
      {
        check: 'number',
        status: /[0-9]/.test(password)
      },
      {
        check: 'upperChar',
        status: /[A-Z]/.test(password)
      },
      {
        check: 'lowerChar',
        status: /[a-z]/.test(password)
      }
    ])
  }
  useEffect(() => {
    setPasswordStrength((passwordValidate && passwordValidate.filter((item) => item.status === true)).length)
  }, [passwordValidate])

  const openNotification = (messageRes) => {
    notification.open({
      message: 'Signup successfully',
      description: messageRes,
      duration: 2,
      icon: (
        <SmileOutlined
          style={{
            color: '#108ee9'
          }}
        />
      )
    })
  }

  const handleChangeModal = () => {
    setIsModalSignup(false)
    setIsModalSignin(true)
  }

  return (
    <div className='register-form'>
      <Form
        labelCol={{ span: 8 }}
        layout='vertical'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form = {form}
        onValuesChange = {() =>{
          setErrorMessage()
        }}
      >
        <Form.Item
          name={['user', 'email']}
          label='Email'
          className='input-item-group'
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your email!',
              pattern: new RegExp(validateEmail)
            }
          ]}
          hasFeedback
        >
          <div className='input-item'>
            <Input />
          </div>
        </Form.Item>
        <Form.Item
          name={['user', 'password']}
          label='Password'
          className='input-item-group'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            },
            {
              message: 'Password at least 8 characters. number(s) and letter (S)!',
              pattern: new RegExp(validatePassword)
            }
          ]}
          hasFeedback
        >
          <div className='input-item'>
            <Input.Password onChange={handlePassword}/>
          </div>
        </Form.Item>

        <Form.Item
          name={['user', 'confirm']}
          label='Confirm Password'
          dependencies={['user', 'password']}
          className='input-item-group'
          onChange={handlePassword}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            {
              pattern: new RegExp(validatePassword),
              message: 'Password at least 8 characters. number(s) and letter (S)!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(['user', 'password']) === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                )
              }
            })
          ]}
          hasFeedback
        >
          <div className='input-item'>
            <Input.Password />
          </div>
        </Form.Item>
        {errorMessage !== ''
          ? <Typography className='message-error'>
            <Text type='danger'>{errorMessage && errorMessage}</Text>
          </Typography>
          : ''
        }
        <Row className={`${passwordStrength === 0 ? 'none-password' : ''} group-check-password`}>
          <Col span={22} offset={1}>
            <Row gutter={6}>
              <Col span={6}>
                <div
                  className={`${passwordStrength && passwordStrength === 1 ? 'bad-password'
                    : passwordStrength === 2 ? 'weak-password'
                      : passwordStrength === 3 ? 'medium-password'
                        : passwordStrength === 4 ? 'strong-password' : ''} check-password`}
                ></div>
              </Col>
              <Col span={6}>
                <div
                  className={`${passwordStrength && passwordStrength === 2 ? 'weak-password'
                    : passwordStrength === 3 ? 'medium-password'
                      : passwordStrength === 4 ? 'strong-password' : ''} check-password`}
                ></div>
              </Col>
              <Col span={6}>
                <div
                  className={`${passwordStrength && passwordStrength === 3 ? 'medium-password'
                    : passwordStrength === 4 ? 'strong-password' : ''} check-password`}
                ></div>
              </Col>
              <Col span={6}>
                <div
                  className={`${passwordStrength && passwordStrength === 4 ? 'strong-password' : ''} check-password`}
                ></div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className='register-form__checkbox'>
          <Checkbox checked={checked} onChange={ ()=>{ setChecked(!checked) }}>
            <span>Agree with <a>Privacy Policy</a></span>
          </Checkbox>
        </div>
        <Form.Item>
          <div className='register-form__button'>
            <button htmltype='submit' disabled={!checked}>
              Sign up
            </button>
          </div>
        </Form.Item>
      </Form>
      <div className='register-form__network--login'>
        <span>Or login with</span>
        <div className='register-form__network'>
          <img
            className='coinbase-icon'
            src='https://content.diadata.org/wp-content/uploads/2021/10/Coinbase.svg'
            alt='coinbase icon'
          />
          <img
            className='fb-icon'
            src='https://www.seekpng.com/png/full/51-516623_facebook-transparent-background-facebook-round-logo-blue-circle.png'
            alt='fb icon'
          />
          <img
            className='twt-icon'
            src='https://www.pngkey.com/png/full/484-4846390_twitter-round-logo-transparent-clipart-computer-icons-telegram.png'
            alt='twt-icon'
          />
          <img
            className='google-icon'
            src='/google.png'
            alt='google-icon'
          />
          <img
            className='apple-icon'
            src='https://www.freeiconspng.com/uploads/apple-icon-20.png'
            alt='apple-icon'
          />
        </div>
        <div className='register-form__login-link'>
          <span> Already have an account? <a onClick={handleChangeModal}>Sign in</a></span>
        </div>
        <Modal
          visible={isModalSignin}
          footer={null}
          onOk={() => setIsModalSignin(false)}
          onCancel={() => setIsModalSignin(false)}
        >
          <SignIn setIsModalSignin={setIsModalSignin}/>
        </Modal>
      </div>
    </div>
  )
}
