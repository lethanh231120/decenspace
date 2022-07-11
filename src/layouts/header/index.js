import React, { useState } from 'react'
import { Menu, Modal, Typography } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import 'antd/dist/antd.min.css'
import SignIn from '../../pages/auth/login'
import { Signup } from '../../pages/auth/register'
import UpdatePassword from '../../components/auth/UpdatePassword'
import { useSelector, useDispatch } from 'react-redux'
import { removeCookie, STORAGEKEY } from '../../utils/storage'
import { resetUserInfo } from '../../redux/useInfo'
import { get } from '../../api/BaseRequest'

const { Header } = Layout

const items = [
  {
    label: (<NavLink className='header__link' to='/'>Home</NavLink>),
    key: 'home'
    // icon: <MailOutlined />
  },
  {
    label: (<NavLink className='header__link' to='portfolio'>Portfolio Tracker</NavLink>),
    key: 'portfolio'
  },
  {
    label: (<NavLink className='header__link' to='swap'>Swap</NavLink>),
    key: 'swap'
  },
  {
    label: (
      <NavLink className='header__link' to='price'>Pricing</NavLink>
    ),
    key: 'pricing'
  },
  {
    label: (
      <NavLink className='header__link' to='blog'>Blog</NavLink>
    ),
    key: 'blog'
  }
]

const Navbar = () => {
  // const [current, setCurrent] = useState('blog')
  const [isModalSignin, setIsModalSignin] = useState(false)
  const [isModalSignup, setIsModalSignup] = useState(false)
  const [isModalPasswordUpdate, setIsModalPasswordUpdate] = useState(false)
  const { user, isAuthenticated } = useSelector(state => state.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onClick = (e) => {
    // setCurrent(e.key)
  }

  const logout = async() => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN)
    await get('user/logout')
    dispatch(resetUserInfo())
    navigate('/')
  }

  return (
    <>
      <Layout className='header'>
        <Header
          style={{
            padding: '0 5%',
            // backgroundColor: '#000',
            colorButton: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className='logo' style={{ fontSize: '20px', fontWeight: '500', color: '#fff' }}>DECENSPACE</div>
            <Menu onClick={onClick} mode='horizontal' items={items} />
          </div>
          {isAuthenticated ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '250px' }}>
            <Typography
              component='span'
              variant='subtitle1'
              fontWeight='bold'
            >
              <NavLink className='header__link' to='profile'>
                {({ isActive }) => (
                  <div
                    component='span'
                    className={isActive ? 'activeClassName' : ''}
                    style={{ color: '#fff' }}
                  >
                    {user && user.first_name}{user && user.last_name}
                  </div>
                )}
              </NavLink>
            </Typography>
            <Typography
              variant='subtitle1'
              // onClick={() => setIsOpen(true)}
              className='header__link'
              style={{ color: '#fff' }}
              onClick={() => setIsModalPasswordUpdate(true)}
            >
              Change Password
            </Typography>
            <Typography
              variant='subtitle1'
              onClick={logout}
              className=' header__link'
              style={{ color: '#fff' }}
            >
              Logout
            </Typography>
          </div>
            : <div style={{ display: 'flex', alignItems: 'center', width: '150px', justifyContent: 'space-around ' }}>
              <Typography style={{ color: '#fff' }} onClick={() => setIsModalSignin(true)}>
                Đăng nhập
              </Typography>
              <Typography style={{ color: '#fff' }} onClick={() => setIsModalSignup(true)}>
                Đăng ký
              </Typography>
            </div>}
        </Header>
      </Layout>
      <Modal
        visible={isModalSignin}
        footer={null}
        onOk={() => setIsModalSignin(false)}
        onCancel={() => setIsModalSignin(false)}
        className='model-register'
      >
        <SignIn setIsModalSignin={setIsModalSignin}/>
      </Modal>
      <Modal
        visible={isModalSignup}
        footer={null}
        onOk={() => setIsModalSignup(false)}
        onCancel={() => setIsModalSignup(false)}
        className='model-register'
      >
        <Signup setIsModalSignup={setIsModalSignup}/>
      </Modal>
      <Modal
        visible={isModalPasswordUpdate}
        footer={null}
        onOk={() => setIsModalPasswordUpdate(false)}
        onCancel={() => setIsModalPasswordUpdate(false)}
      >
        <UpdatePassword setIsModalPasswordUpdate={setIsModalPasswordUpdate}/>
      </Modal>
    </>
  )
}
export default Navbar
