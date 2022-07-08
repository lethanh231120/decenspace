import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Image, Select, Spin } from 'antd'
import { post } from '../../../api/BaseRequest'
import { validateAddress, validatePhone, validateEmail, validatePassword, validateMaxLength } from '../../../utils/regex'
import phones from '../../../utils/phoneCode.json'
import axios from 'axios'
const { Option } = Select
export const Signup = () => {
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  const [image, setImage] = useState()
  const [open, setOpen] = useState(false)
  const [countryCode, setCountryCode] = useState()
  const [listPhoneCode, setListPhoneCode] = useState(phones)
  const [phoneCode, setPhoneCode] = useState()
  const [typeSearch, setTypeSearch] = useState('number')
  const onFinish = async(values) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    }
    try {
      const formData = new FormData()
      Object.keys(values).forEach(key => formData.append(`${key}`, values[key]))
      formData.append('image', image)
      formData.append('isAdmin', false)
      await post('users', formData, config)
      setMessage('Đăng ký thành công! Kiểm tra email của bạn để lấy thông tin đăng nhập')
      setOpen(true)
    } catch (error) {
      error?.response?.data && setError(error.response.data.message)
    }
  }

  const handleChangePhoneCode = (value) => {
    setPhoneCode(value)
  }

  const handleSearchPhoneCode = (value) => {
    const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    number.some((item) => {
      if (parseInt(value.slice(0, 1)) === item) {
        setTypeSearch('number')
        setListPhoneCode(phones.filter((phone) => ((phone.dial_code.slice(1).slice(0, value.length) === value))))
        return true
      } else {
        setTypeSearch('string')
        setListPhoneCode(phones.filter((phone) => (phone.code.slice(0, value.length).toLowerCase() === value.toLowerCase())))
        return false
      }
    })
    // console.log(typeof value)
    // phones.filter((item) => (
    //   (item.dial_code.slice(1).slice(0, value.length) === value)
    //     ? (item.dial_code.slice(1).slice(0, value.length) === value)
    //     : (item.code.slice(0, value.length).toLowerCase() === value.toLowerCase()
    //     )
    // ))
    // phones.filter((item) => (console.log(item.code.slice(0, value.length).toLowerCase() === value.toLowerCase())))
    // phones.filter((item) => (console.log(item.code.slice(0, value.length) === value)))
    // console.log(phones)
    // console.log(value.toLowerCase())
    // setListPhoneCode(phones.filter((item) => ((item.dial_code.slice(1).slice(0, value.length) === value)
    //   ? (item.dial_code.slice(1).slice(0, value.length) === value)
    //   : (item.code.slice(0, value.length).toLowerCase() === value.toLowerCase())
    // )))
    // console.log(value)
    // setListPhoneCode(phones.filter((item) => ((item.code.slice(0, value.length).toLowerCase() === value.toLowerCase()))))
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    axios.get(`https://ip.nf/me.json`).then(({ data }) => setCountryCode({ ...data.ip })).catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    const getPhoneCode = () => {
      countryCode && listPhoneCode && listPhoneCode.map((item) => {
        if (item.code === countryCode.country_code) {
          setPhoneCode(item.dial_code.slice(1))
        }
      })
    }
    getPhoneCode()
  }, [countryCode])

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      {console.log(listPhoneCode)}
      <Select
        style={{ width: 120 }}
        onChange={handleChangePhoneCode}
        defaultValue={phoneCode !== '' ? phoneCode : ''}
        showSearch={true}
        onSearch={handleSearchPhoneCode}
      >
        {listPhoneCode.map((item, index) => (
          <Option key={index} value={typeSearch === 'number' ? `${item.dial_code.slice(1)}` : item.code}>
            <span className='country-code'>{item.code}</span>
            <span className='country-symbol'>{item.dial_code}</span>
          </Option>
        ))}
      </Select>
    </Form.Item>
  )

  return (
    phoneCode !== undefined ? (<Form labelCol={{ span: 8 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {message && message}
      {open && open}
      <div>
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
      </div>
      <Form.Item
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
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label='Email'
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please input your email!',
            pattern: new RegExp(validateEmail)
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
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
      </Form.Item>
      <Form.Item
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
      </Form.Item>
      <Form.Item
        name={['user', 'password']}
        label='Password'
        rules={[
          {
            required: true,
            message: 'Mật khẩu bao gồm cả chữ hoa, chữ thường, số và ít nhất 8 kỹ tự!',
            pattern: new RegExp(validatePassword)
            // pattern: new RegExp('(?=(.*[0-9]))([\!@#$%^&*()\\[\]{}\-_+=~`|:;'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}')
          }
        ]}
      >
        <Input.Password />
      </Form.Item>
      {error && error}
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>)
      : (<div
        className='example'
        style={{
          margin: '20px 0',
          marginBottom: '20px',
          padding: '30px 50px',
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.05)',
          borderRadius: '4px'
        }}
      >
        <Spin size='large' />
      </div>)
  )
}
