import React, { useEffect } from 'react'
import { getProfile } from '../../redux/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Typography, Row, Col, Image, Button } from 'antd'
const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profile } = useSelector(state => state.profile)
  useEffect(() => {
    dispatch(getProfile())
  }, [])
  console.log(profile)

  const handleCancel = () => {
    navigate(-1)
  }
  return (
    <div style={{ width: '100%', padding: '30px', display: 'flex', alignItems: 'center' }} >
      <div style={{ width: '100px', height: '100px' }}>
        <Image
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt='avatar-official'
          src={profile && profile.image}
        />
      </div>
      <div style={{ width: '50%' }}>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>Họ đệm</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>{profile && profile.first_name}</Typography>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>Tên</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>{profile && profile.last_name}</Typography>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>Email</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>{profile && profile.email}</Typography>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>Địa chỉ</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>{profile && profile.address}</Typography>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>Số điện thoại</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>{profile && profile.phone}</Typography>
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
    </div>
  )
}
export default Profile
