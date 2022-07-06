import React, { useState } from 'react'
import { Button, Form, Input, Image, Select } from 'antd'
import { post } from '../../../api/BaseRequest'
import { validateAddress, validatePhone, validateEmail, validatePassword } from '../../../utils/regex'
import phones from '../../../utils/phoneCode.json'

const layout = {
  labelCol: {
    span: 8
  }
}
const { Option } = Select
export const Signup = () => {
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  const [image, setImage] = useState()
  const [open, setOpen] = useState(false)
  const [phoneCode, setPhoneCode] = useState('+1')
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
  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select
        style={{ width: 100 }}
        onChange={handleChangePhoneCode}
        defaultValue={phoneCode}
      >
        {phones && phones.map((item, index) => (
          <Option key={index} value={`${item.dial_code.slice(1)}`}>{item.dial_code}</Option>
        ))}
      </Select>
    </Form.Item>
  )
  return (
    <Form {...layout} name='nest-messages' onFinish={onFinish} >
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
        //   style={{ display: 'none' }}
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
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
