import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../redux/profileSlice'
import { Form, Image, Input, Button, Select } from 'antd'
import { put } from '../../../api/BaseRequest'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { validateAddress, validateEmail, validatePhone } from '../../../utils/regex'
import phones from '../../../utils/phoneCode.json'

const { Option } = Select
const layout = {
  labelCol: {
    span: 8
  }
}

const EditProfile = () => {
  const [error, setError] = useState()
  const [image, setImage] = useState()
  const [message, setMessage] = useState()
  const [open, setOpen] = useState(false)
  const [phoneCode, setPhoneCode] = useState('+1')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profile } = useSelector(state => state.profile)
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

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
      await put('user/profile', formData, config)
      setMessage('Cập nhật thông tin thành công')
      setOpen(true)
      navigate(-1)
    } catch (error) {
      error?.response?.data && setError(error.response.data.message)
    }
  }
  const handleCancel = () => {
    navigate('/')
  }
  return (
    <Form {...layout} name='nest-messages' onFinish={onFinish} >
      {open && open}
      <div style={{ color: '#fff' }}>{message && message}</div>
      <div>
        <Image
          width={200}
          src={(profile && !image) ? profile.image : (profile && image) ? (URL.createObjectURL(image)) : profile ? profile.image : '/images/user.png'}
        />
      </div>
      <div>
        <Input
          type='file'
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <Form.Item
        style={{ color: '#fff' }}
        name='first_name'
        label='Họ đệm'
        rules={[
          {
            required: true,
            message: 'Please input your name!'
          }
        ]}
      >
        <Input placeholder={`${profile && profile.first_name}`}/>
      </Form.Item>
      <Form.Item
        name='last_name'
        label='Tên'
        rules={[
          {
            required: true,
            message: 'Please input your name!'
          }
        ]}
      >
        <Input placeholder={`${profile && profile.last_name}`}/>
      </Form.Item>
      <Form.Item
        name='email'
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
        <Input placeholder={`${profile && profile.email}`}/>
      </Form.Item>
      <Form.Item
        name='phone'
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
          placeholder={`${profile && profile.phone}`}
          style={{
            width: '100%'
          }}
        />
      </Form.Item>
      <Form.Item
        name='address'
        label='Address'
        rules={[
          {
            required: true,
            message: 'Please input your address!',
            pattern: new RegExp(validateAddress)
          }
        ]}
      >
        <Input placeholder={`${profile && profile.address}`}/>
      </Form.Item>
      {error && error}
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type='primary' htmlType='submit'>
          Cập nhật
        </Button>
        <Button type='primary' danger onClick={handleCancel}>
          Hủy
        </Button>
      </Form.Item>
    </Form>
  )
}
export default EditProfile
