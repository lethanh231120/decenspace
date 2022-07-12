import React, { useState } from 'react'
// import React, { useState, useEffect } from 'react'
// import { Button, Form, Input, Image, Select, Spin } from 'antd'
import { setCookie, STORAGEKEY } from '../../../utils/storage'
import { Button, Form, Input } from 'antd'
import { post } from '../../../api/BaseRequest'
import { useDispatch } from 'react-redux/es/exports'
import { getUserInfo } from '../../../redux/useInfo'
// import { validateAddress, validatePhone, validateEmail, validatePassword, validateMaxLength } from '../../../utils/regex'
import { validateEmail, validatePassword } from '../../../utils/regex'
// import { MailOutlined, LockOutlined } from '@ant-design/icons'
import './style.scss'
// import phones from '../../../utils/phoneCode.json'
// import axios from 'axios'
// const { Option } = Select
export const Signup = ({ setIsModalSignup }) => {
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  // const [image, setImage] = useState()
  const [open, setOpen] = useState(false)
  // const [countryCode, setCountryCode] = useState()
  // const [listPhoneCode, setListPhoneCode] = useState(phones)
  // const [phoneCode, setPhoneCode] = useState()
  // const [typeSearch, setTypeSearch] = useState('number')
  const dispatch = useDispatch()
  const [passwordValidate, setPasswordValidate] = useState({
    minChar: null,
    number: null,
    upperChar: null,
    lowerChar: null
  })

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
    console.log(values)
    try {
      // const formData = new FormData()
      // Object.keys(values).forEach(key => formData.append(`${key}`, values[key]))
      // formData.append('image', image)
      // formData.append('isAdmin', false)
      const res = await post('accounts/signup', values.user, config)
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

  // const handleChangePhoneCode = (value) => {
  //   setPhoneCode(value)
  // }

  // const handleSearchPhoneCode = (value) => {
  //   const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  //   number.some((item) => {
  //     if (parseInt(value.slice(0, 1)) === item) {
  //       setTypeSearch('number')
  //       setListPhoneCode(phones.filter((phone) => ((phone.dial_code.slice(1).slice(0, value.length) === value))))
  //       return true
  //     } else {
  //       setTypeSearch('string')
  //       setListPhoneCode(phones.filter((phone) => (phone.code.slice(0, value.length).toLowerCase() === value.toLowerCase())))
  //       return false
  //     }
  //   })
  // }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // useEffect(() => {
  //   axios.get(`https://ip.nf/me.json`).then(({ data }) => setCountryCode({ ...data.ip })).catch((error) => console.log(error))
  // }, [])

  // useEffect(() => {
  //   const getPhoneCode = () => {
  //     countryCode && listPhoneCode && listPhoneCode.map((item) => {
  //       if (item.code === countryCode.country_code) {
  //         setPhoneCode(item.dial_code.slice(1))
  //       }
  //     })
  //   }
  //   getPhoneCode()
  // }, [countryCode])

  // const prefixSelector = (
  //   <Form.Item name='prefix' noStyle>
  //     {console.log(listPhoneCode)}
  //     <Select
  //       style={{ width: 120 }}
  //       onChange={handleChangePhoneCode}
  //       defaultValue={phoneCode !== '' ? phoneCode : ''}
  //       showSearch={true}
  //       onSearch={handleSearchPhoneCode}
  //     >
  //       {listPhoneCode.map((item, index) => (
  //         <Option key={index} value={typeSearch === 'number' ? `${item.dial_code.slice(1)}` : item.code}>
  //           <span className='country-code'>{item.code}</span>
  //           <span className='country-symbol'>{item.dial_code}</span>
  //         </Option>
  //       ))}
  //     </Select>
  //   </Form.Item>
  // )

  const handleChangePassword = (e) => {
    const password = e.target.value
    setPasswordValidate({
      minChar: password.length > 7,
      number: /[0-9]/.test(password),
      upperChar: /[A-Z]/.test(password),
      lowerChar: /[a-z]/.test(password)
    })
  }

  console.log(passwordValidate)
  return (
    <>
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
          name='password'
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
            <Input.Password onChange={handleChangePassword}/>
          </div>
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          className='input-item-group'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            {
              pattern: new RegExp(validateEmail),
              message: 'Password at least 8 characters. number(s) and letter (S)!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                // return <Tooltip placement='top' title='loi roi'/>
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
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* // : (<div
      //   className='example'
      //   style={{
      //     margin: '20px 0',
      //     marginBottom: '20px',
      //     padding: '30px 50px',
      //     textAlign: 'center',
      //     background: 'rgba(0, 0, 0, 0.05)',
      //     borderRadius: '4px'
      //   }}
      // >
      //   <Spin size='large' />
      // </div>) */}
    </>
  )
}
