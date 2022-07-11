import React, { useEffect } from 'react'
// import { getUs } from '../../redux/profileSlice'
import { getUserInfo } from '../../redux/useInfo'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Typography, Row, Col, Image, Button } from 'antd'
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
    <div style={{ width: '100%', padding: '30px', display: 'flex', alignItems: 'center' }} >
      <div style={{ width: '100px', height: '100px' }}>
        <Image
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt='avatar-official'
          src={user && user.image}
        />
      </div>
      <div style={{ width: '50%' }}>
        {/* <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>Họ đệm</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>{user && user.name}</Typography>
          </Col>
        </Row> */}
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>Tên</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>{user && user.name}</Typography>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>Email</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>{user && user.email}</Typography>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>Địa chỉ</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>{user && user.address}</Typography>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>Số điện thoại</Typography>
          </Col>
          <Col className='gutter-row' span={6}>
            <Typography style={{ color: '#fff' }}>{user && user.phone}</Typography>
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
