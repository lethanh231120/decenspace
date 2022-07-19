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
  console.log(user)
  return (
    <Content className='profile'>
      <div className='profile-avatar'>
        <Image
          preview={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt='avatar-official'
          src={user?.image || '/profile-user.png'}
        />
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e945c4d (fix giao dien profile, edit profile)
      <div className='profile-content'>
        <Row gutter={24}>
          <Col span={8} className='profile-col'>
            <div className='profile-item'>
              <Typography>Tên</Typography>
            </div>
            <div className='profile-item'>
              <Typography>Email</Typography>
            </div>
            <div className='profile-item'>
              <Typography>Địa chỉ</Typography>
            </div>
            <div className='profile-item'>
              <Typography>Số điện thoại</Typography>
            </div>
            <div className='profile-item'>
              <Typography>Ngày sinh</Typography>
            </div>
            <div className='profile-item'>
              <Typography>Giới tính</Typography>
            </div>
            <div className='profile-item'>
              <Typography>Mã quốc gia</Typography>
            </div>
            <div className='profile-item'>
              <Typography>Số chứng minh thư / CCCD</Typography>
            </div>
            <div className='profile-item'>
              <Typography>Số hộ chiếu</Typography>
            </div>
<<<<<<< HEAD
          </Col>
          <Col span={16} className='profile-col'>
            <div className='profile-item'>
              <Typography>{user.name}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.email}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.address}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.phone}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.dob}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.sex}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.nationalId}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.idCard}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.passport}</Typography>
            </div>
          </Col>
        </Row>
        <div className='profile-button'>
=======
      <div>
        <Row>
          <Col>
            <Typography>Tên</Typography>
            <Typography>Email</Typography>
            <Typography>Địa chỉ</Typography>
            <Typography>Số điện thoại</Typography>
=======
>>>>>>> e945c4d (fix giao dien profile, edit profile)
          </Col>
          <Col span={16} className='profile-col'>
            <div className='profile-item'>
              <Typography>{user.name}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.email}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.address}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.phone}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.dob}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.sex}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.nationalId}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.idCard}</Typography>
            </div>
            <div className='profile-item'>
              <Typography>{user.passport}</Typography>
            </div>
          </Col>
        </Row>
<<<<<<< HEAD
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
>>>>>>> f3d42af (fix url base)
=======
        <div className='profile-button'>
>>>>>>> e945c4d (fix giao dien profile, edit profile)
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
