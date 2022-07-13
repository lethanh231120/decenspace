import React, { useState, useEffect } from 'react'
import { setCookie, STORAGEKEY } from '../../utils/storage'
import { Form, Input, Checkbox, Row, Col } from 'antd'
import { post } from '../../api/accountBaseRequest'
import { useDispatch } from 'react-redux/es/exports'
import { getUserInfo } from '../../redux/useInfo'
import { validateEmail, validatePassword } from '../../utils/regex'

const Register = ({ setIsModalSignup }) => {
  const [message, setMessage] = useState()
  const [error, setError] = useState()
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

  const [passwordValidate, setPasswordValidate] = useState([])
  const [passwordStrengh, setPasswordStreng] = useState()
  const [checked, setChecked] = useState(false)

  const onFinish = async(values) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        // 'Accept': 'application/json'
      }
    }
    const data = {
      email: values.user.email,
      password: values.user.password
    }
    console.log(data)
    try {
      // const formData = new FormData()
      // Object.keys(values).forEach(key => formData.append(`${key}`, values[key]))
      // formData.append('image', image)
      // formData.append('isAdmin', false)
      const res = await post('accounts/signup', data, config)
      const token = res.data.token
      await setCookie(STORAGEKEY.ACCESS_TOKEN, token)
      await dispatch(getUserInfo())
      setMessage('Đăng ký thành công! Kiểm tra email của bạn để lấy thông tin đăng nhập')
      setOpen(true)
      setIsModalSignup(false)
    } catch (error) {
      error?.response?.data && setError(error.response.data.message)
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
    setPasswordStreng((passwordValidate && passwordValidate.filter((item) => item.status === true)).length)
  }, [passwordValidate])

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className='register-form'>
      <Form
        labelCol={{ span: 8 }}
        layout='vertical'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {message && message}
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
        {error && error}
        <Row className={`${passwordStrengh === 0 ? 'none-password' : ''} group-check-password`}>
          <Col span={22} offset={1}>
            <Row gutter={6}>
              <Col span={6}>
                <div
                  className={`${passwordStrengh && passwordStrengh === 1 ? 'bad-password'
                    : passwordStrengh === 2 ? 'weak-password'
                      : passwordStrengh === 3 ? 'medium-password'
                        : passwordStrengh === 4 ? 'strong-password' : ''} check-password`}
                ></div>
              </Col>
              <Col span={6}>
                <div
                  className={`${passwordStrengh && passwordStrengh === 2 ? 'weak-password'
                    : passwordStrengh === 3 ? 'medium-password'
                      : passwordStrengh === 4 ? 'strong-password' : ''} check-password`}
                ></div>
              </Col>
              <Col span={6}>
                <div
                  className={`${passwordStrengh && passwordStrengh === 3 ? 'medium-password'
                    : passwordStrengh === 4 ? 'strong-password' : ''} check-password`}
                ></div>
              </Col>
              <Col span={6}>
                <div
                  className={`${passwordStrengh && passwordStrengh === 4 ? 'strong-password' : ''} check-password`}
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
            src='http://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png'
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

export default Register
