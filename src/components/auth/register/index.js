import React, { useState, useEffect } from 'react'
import { setCookie, STORAGEKEY } from '../../../utils/storage'
<<<<<<< HEAD
import { Form, Input, Checkbox, Row, Col, Typography, notification } from 'antd'
=======
import { Form, Input, Checkbox, Row, Col, Typography } from 'antd'
>>>>>>> 3db5465 (fix giao dien)
import { post } from '../../../api/accountService'
import { useDispatch } from 'react-redux/es/exports'
import { getUserInfo } from '../../../redux/useInfo'
import { validateEmail, validatePassword } from '../../../utils/regex'
import './style.scss'
import { SUCCESS_REQUEST } from '../../../constants/statusCode'

const { Text } = Typography
export default function Signup({ setIsModalSignup }) {
<<<<<<< HEAD
  const [messageNo, setMessageNo] = useState()
=======
>>>>>>> 3db5465 (fix giao dien)
  const [message, setMessage] = useState()
  const [statusCode, setStatusCode] = useState()
  // const [image, setImage] = useState()
  const [open, setOpen] = useState(false)
  // const [countryCode, setCountryCode] = useState()
  // const [listPhoneCode, setListPhoneCode] = useState(phones)
  // const [phoneCode, setPhoneCode] = useState()
  // const [typeSearch, setTypeSearch] = useState('number')
  const dispatch = useDispatch()
  // const [passwordValidate, setPasswordValidate] = useState({
  //   minChar: null,
  //   number: null,
  //   upperChar: null,
  //   lowerChar: null
  // })
  const [form] = Form.useForm()
  const [passwordValidate, setPasswordValidate] = useState([])
  const [passwordStrength, setPasswordStrength] = useState()
  const [checked, setChecked] = useState(false)
  const onFinish = async(values) => {
<<<<<<< HEAD
=======
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
      }
    }
>>>>>>> 9c169cb (delete http)
    const data = {
      email: values.user.email,
      password: values.user.password
    }
    try {
      const res = await post('accounts/signup', data)
      const token = res.data.token
      await setCookie(STORAGEKEY.ACCESS_TOKEN, token)
      await dispatch(getUserInfo())
      setMessageNo('Sign up successfully! Please check your email to verify.')
      setOpen(true)
      setIsModalSignup(false)
      setStatusCode('')
      setChecked(false)
      setPasswordStrength(0)
      openNotificationSuccess('success')
    } catch (error) {
      error?.response?.data && setStatusCode(error.response.data.code !== SUCCESS_REQUEST && 'Email already exists')
    }

    form.resetFields()
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

<<<<<<< HEAD
  const openNotificationSuccess = (type) => {
    notification[type]({
      message: 'Sign Up',
      description: messageNo,
      duration: 2
    })
  }

  // const openNotificationFailed = (type) => {
  //   notification[type]({
  //     message: 'Failed',
  //     description: statusCode
  //   })
  // }

=======
>>>>>>> 3db5465 (fix giao dien)
  return (
    <div className='register-form'>
      <Form
        labelCol={{ span: 8 }}
        layout='vertical'
        initialValues={{ remember: true }}
        onFinish={onFinish}
<<<<<<< HEAD
        form = {form}
        onValuesChange = {() =>{
          setStatusCode('')
          setPasswordStrength()
        }}
=======
>>>>>>> 3db5465 (fix giao dien)
      >
        {/* {message && message} */}
        {open && open}
        {/* <div>
          <Image
            width={200}
            src={image ? (URL.createObjectURL(image)) : '/images/user.png'}
          />
        </div>
        <div>
          <Input
            type='file'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div> */}
        {/* <Form.Item
          name={['user', 'name']}
          label='Name'
          rules={[
            {
              required: true,
              message: 'Please input your name!'
            }
          ]}
        >
          <Input />
        </Form.Item> */}
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
            {/* <MailOutlined className='input-item-icon'/> */}
            <Input />
          </div>
          {/* <Input size='large' placeholder='large size' prefix={<MailOutlined />} /> */}
        </Form.Item>
        {/* <Form.Item
          name={['user', 'phone']}
          label='Phone'
          rules={[
            {
              required: true,
              pattern: new RegExp(validatePhone),
              message: 'Format is wrong'
            },
            {
              pattern: validateMaxLength,
              message: 'Số điện thoại tối đa 12 số'
            }
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%'
            }}
          />
        </Form.Item> */}
        {/* <Form.Item
          name={['user', 'address']}
          label='Address'
          rules={[
            {
              required: true,
              message: 'Please input your address!',
              pattern: new RegExp(validateAddress)
            }
          ]}
        >
          <Input />
        </Form.Item> */}
        {/* <Form.Item
          name='password'
          label='Password'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Mật khẩu bao gồm cả chữ hoa, chữ thường, số và ít nhất 8 kỹ tự!',
              pattern: new RegExp(validatePassword)
              // pattern: new RegExp('(?=(.*[0-9]))([\!@#$%^&*()\\[\]{}\-_+=~`|:;'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}')
            }
          ]}
        >
          <div className='input-item'>
            <LockOutlined className='input-item-icon'/>
            <Input.Password />
          </div>
        </Form.Item> */}

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
              // message: <Tooltip placement='top' title='Password at least 8 characters. number(s) and letter (S)!'/>,
              pattern: new RegExp(validatePassword)
            }
          ]}
          hasFeedback
        >
          <div className='input-item'>
            {/* <LockOutlined className='input-item-icon'/> */}
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
            {/* <LockOutlined className='input-item-icon'/> */}
            <Input.Password />
          </div>
        </Form.Item>
<<<<<<< HEAD
        {statusCode !== ''
          ? <Typography className='message-error'>
            <Text type='danger'>{statusCode && statusCode}</Text>
          </Typography>
          : ''
        }
        <Row className={`${passwordStrength === 0 ? 'none-password' : ''} group-check-password`}>
=======
        <Typography className='message-error'>
          <Text type='danger'>{statusCode && statusCode}</Text>
        </Typography>
        <Row className={`${passwordStrengh === 0 ? 'none-password' : ''} group-check-password`}>
>>>>>>> 3db5465 (fix giao dien)
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
          <span> Already have an account? <a>Sign in</a></span>
        </div>
      </div>
    </div>
  )
}
