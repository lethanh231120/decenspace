import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../../../redux/useInfo'
import { Form, Input, Button, Select, Layout, Row, Col, Typography, Image, DatePicker, Spin } from 'antd'
import { patch } from '../../../api/accountService'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { validatePhone, validateEmail, validateMaxLength } from '../../../utils/regex'
import phones from '../../../utils/phoneCode.json'
import axios from 'axios'

const { Option } = Select
const { Content } = Layout

const EditProfile = () => {
  const [countryCode, setCountryCode] = useState()
  const [listPhoneCode, setListPhoneCode] = useState(phones)
  const [phoneCode, setPhoneCode] = useState()
  const [typeSearch, setTypeSearch] = useState('number')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.userInfo)

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

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
      <Select
        style={{ width: 120 }}
        onChange={handleChangePhoneCode}
        defaultValue={phoneCode !== '' && phoneCode}
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
  const onFinish = async(fieldsValue) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const values = {
      'name': fieldsValue['name'] ? fieldsValue['name'] : user.name,
      'phone': fieldsValue['phone'] ? fieldsValue['phone'] : user.phone,
      'address': fieldsValue['address'] ? fieldsValue['address'] : user.address,
      'idCard': fieldsValue['idCard'] ? fieldsValue['idCard'] : user.idCard,
      'sex': fieldsValue['sex'] ? fieldsValue['sex'] : user.sex,
      'passport': fieldsValue['passport'] ? fieldsValue['passport'] : user.passport,
      'nationalId': fieldsValue['nationalId'] ? fieldsValue['nationalId'] : user.nationalId,
      'dob': fieldsValue['dob']?.format('DD/MM/YYYY') ? fieldsValue['dob']?.format('DD/MM/YYYY') : user.dob
    }
    try {
      await patch('accounts/profile/current-profile', values, config)
      navigate(-1)
    } catch (error) {
      // error?.response?.data && setError(error.response.data.message)
    }
  }
  const handleCancel = () => {
    navigate('/')
  }
  console.log(typeof phoneCode)
  console.log(phoneCode)
  return (
    <>
      {/* <Form name='nest-messages' onFinish={onFinish} >
        {open && open}
        <div style={{ color: '#fff' }}>{message && message}</div>
        <div>
          <Image
            width={200}
            src={(user && !image) ? user.image : (user && image) ? (URL.createObjectURL(image)) : user ? user.image : '/images/user.png'}
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
          <Input placeholder={`${user && user.first_name}`}/>
        </Form.Item>
        <Form.Item
          name='name'
          label='Tên'
          rules={[
            {
              required: true,
              message: 'Please input your name!'
            }
          ]}
        >
          <Input placeholder={`${user && user.name}`}/>
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
          <Input placeholder={`${user && user.email}`}/>
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
            placeholder={`${user && user.phone}`}
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
          <Input placeholder={`${user && user.address}`}/>
        </Form.Item>
        {error && error}
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Cập nhật
          </Button>
          <Button type='primary' danger onClick={handleCancel}>
            Hủy
          </Button>
        </Form.Item>
      </Form> */}
      <Content className='profile'>
        {phoneCode ? (
          <Form onFinish={onFinish} >
            <div className='profile-avatar'>
              <Image
                preview={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                alt='avatar-official'
                src={user?.image || '/profile-user.png'}
              />
            </div>
            <div>
              <Row gutter={24}>
                <Col span={8} className='profile-col'>
                  <div className='profile-item-edit'>
                    <Typography>Tên</Typography>
                  </div>
                </Col>
                <Col span={16} className='profile-col'>
                  <div className='profile-item-input'>
                    <Form.Item name='name'>
                      <Input placeholder={`${user && user.name}`}/>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8} className='profile-col'>
                  <div className='profile-item-edit'>
                    <Typography>Email</Typography>
                  </div>
                </Col>
                <Col span={16} className='profile-col'>
                  <div className='profile-item-input'>
                    <div className='profile-item-input'>
                      <Form.Item
                        name='email'
                        className='input-item-group'
                        rules={[
                          {
                            type: 'email',
                            message: 'Please input your email!',
                            pattern: new RegExp(validateEmail)
                          }
                        ]}
                      >
                        <Input placeholder={`${user && user.email}`} disabled={true}/>
                      </Form.Item>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8} className='profile-col'>
                  <div className='profile-item-edit'>
                    <Typography>Địa chỉ</Typography>
                  </div>
                </Col>
                <Col span={16} className='profile-col'>
                  <div className='profile-item-input'>
                    <Form.Item name='address'>
                      <Input placeholder={`${user && user.address}`}/>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8} className='profile-col'>
                  <div className='profile-item-edit'>
                    <Typography>Số điện thoại</Typography>
                  </div>
                </Col>
                <Col span={16} className='profile-col'>
                  <div className='profile-item-input'>
                    <Form.Item
                      name='phone'
                      rules={[
                        {
                          pattern: new RegExp(validatePhone),
                          message: 'Format is wrong'
                        },
                        {
                          pattern: new RegExp(validateMaxLength),
                          message: 'Phone number up to 12 characters'
                        }
                      ]}
                    >
                      <Input
                        addonBefore={prefixSelector}
                        placeholder={`${user && user.phone}`}
                        style={{
                          width: '100%'
                        }}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8} className='profile-col'>
                  <div className='profile-item-edit'>
                    <Typography>Ngày sinh</Typography>
                  </div>
                </Col>
                <Col span={16} className='profile-col'>
                  <div className='profile-item-input'>
                    <Form.Item name='dob'>
                      <DatePicker format='DD/MM/YYYY'/>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8} className='profile-col'>
                  <div className='profile-item-edit'>
                    <Typography>Giới tính</Typography>
                  </div>
                </Col>
                <Col span={16} className='profile-col'>
                  <div className='profile-item-input'>
                    <Form.Item name='sex'>
                      <Input placeholder={`${user && user.sex}`}/>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8} className='profile-col'>
                  <div className='profile-item-edit'>
                    <Typography>Số chứng minh thư/CCCD</Typography>
                  </div>
                </Col>
                <Col span={16} className='profile-col'>
                  <div className='profile-item-input'>
                    <Form.Item name='idCard'>
                      <Input placeholder={`${user && user.idCard}`}/>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8} className='profile-col'>
                  <div className='profile-item-edit'>
                    <Typography>Mã quốc gia</Typography>
                  </div>
                </Col>
                <Col span={16} className='profile-col'>
                  <div className='profile-item-input'>
                    <Form.Item name='nationalId'>
                      <Input placeholder={`${user && user.nationalId}`}/>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8} className='profile-col'>
                  <div className='profile-item-edit'>
                    <Typography>Số hộ chiếu</Typography>
                  </div>
                </Col>
                <Col span={16} className='profile-col'>
                  <div className='profile-item-input'>
                    <Form.Item name='passport'>
                      <Input placeholder={`${user && user.passport}`}/>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </div>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Cập nhật
              </Button>
              <Button type='primary' danger onClick={handleCancel}>
                Hủy
              </Button>
            </Form.Item>
          </Form>) : (<div
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
        </div>)}
      </Content>
    </>
  )
}
export default EditProfile
