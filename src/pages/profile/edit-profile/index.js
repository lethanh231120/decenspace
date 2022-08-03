import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../../../redux/useInfo'
import { Form, Input, Button, Select, Layout, Row, Col, Typography, Image, DatePicker, Spin, Modal, Result } from 'antd'
import { patch } from '../../../api/accountService'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { accountProfileStatus } from '../../../constants/statusCode'
import { validatePhone, validateEmail, validateMaxLength } from '../../../utils/regex'
import phones from '../../../utils/phoneCode.json'
import axios from 'axios'

const { Option } = Select
const { Content } = Layout
const { Text } = Typography

const EditProfile = () => {
  const [phoneCode, setPhoneCode] = useState('+1')
  const [countryCode, setCountryCode] = useState()
  const [listPhoneCode, setListPhoneCode] = useState(phones)
  const [typeSearch, setTypeSearch] = useState('number')
  const [openModalNoti, setOpanModalNoti] = useState(false)
  const [message, setMessage] = useState()
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
      const res = await patch('accounts/profile/current-profile', values, config)
      res && accountProfileStatus.map((item) => {
        if (item.code === res.code) {
          setMessage({
            message: item.message
          })
          setOpanModalNoti(true)
        }
      })
    } catch (error) {
      error?.response?.data && setMessage({
        error: error.response.data.message
      })
    }
  }

  const handleNoti = () => {
    setOpanModalNoti(false)
    navigate(-1)
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <>
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
            {message?.error !== ''
              ? <Typography className='message-error'>
                <Text type='danger'>{message?.error && message?.error}</Text>
              </Typography>
              : ''
            }
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
      <Modal
        className='reset-password-modal'
        visible={openModalNoti}
        onOk={() => handleNoti()}
        onCancel={() => handleNoti()}
      >
        <Result
          status='success'
          title={message?.message}
        />
      </Modal>
    </>
  )
}
export default EditProfile
