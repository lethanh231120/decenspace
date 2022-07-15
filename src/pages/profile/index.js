import React, { useEffect } from 'react'
// import { getUs } from '../../redux/profileSlice'
import { getUserInfo } from '../../redux/useInfo'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Typography, Row, Col, Image, Button, Layout } from 'antd'
import './style.scss'
const { Content } = Layout
const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.userInfo)
  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  const handleCancel = () => {
    navigate(-1)
  }
  return (
    <Content className='profile'>
      <div className='profile-avatar'>
        <Image
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt='avatar-official'
          src={user && user.image}
        />
      </div>
      <div>
        <Row>
          <Col>
            <Typography>Tên</Typography>
            <Typography>Email</Typography>
            <Typography>Địa chỉ</Typography>
            <Typography>Số điện thoại</Typography>
          </Col>
          <Col></Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography>Tên</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography>{user && user.name}</Typography>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography>Email</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography>{user && user.email}</Typography>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography>Địa chỉ</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography>{user && user.address}</Typography>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography>Số điện thoại</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography>{user && user.phone}</Typography>
          </Col>
        </Row>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '180px' }}>
          <Button type='primary' size='medium'>
            <Link to='../edit-profile'>Edit Profile</Link>
          </Button>
          <Button type='primary' danger onClick={handleCancel}>
            Hủy
          </Button>
        </div>
      </div>
    </Content>
  )
}
export default Profile
