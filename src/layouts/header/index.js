import React, { useEffect, useState } from 'react'
import { Menu, Modal, Typography } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import 'antd/dist/antd.min.css'
import SignIn from '../../components/auth/login'
import Signup from '../../components/auth/register/index'
import UpdatePassword from '../../components/auth/update-password'
import { useSelector, useDispatch } from 'react-redux'
import { removeCookie, getCookie, STORAGEKEY } from '../../utils/storage'
import { resetUserInfo } from '../../redux/useInfo'
import { setCookie } from '../../utils/storage'
import _ from 'lodash'

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
    label: (<NavLink className='header__link' to='cryptocurrencies'>Cryptocurrencies</NavLink>),
    key: 'cryptocurrencies'
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
  const [isModalSignin, setIsModalSignin] = useState(false)
  const [isModalSignup, setIsModalSignup] = useState(false)
  const [isModalPasswordUpdate, setIsModalPasswordUpdate] = useState(false)
  const { user } = useSelector(state => state.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onClick = (e) => {
    // setCurrent(e.key)
  }
  const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  const logout = async() => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN)
    await removeCookie(STORAGEKEY.USER_INFO)
    // await get('user/logout')
    dispatch(resetUserInfo())
    navigate('/')
  }

  useEffect(() => {
    const setUserInfo = async() => {
      await setCookie(STORAGEKEY.USER_INFO, user)
    }
    !_.isEmpty(user) && setUserInfo()
  }, [user])

  const handleChangePassword = () => {
    setIsModalPasswordUpdate(true)
  }

  return (
    <>
      <Layout className='header'>
        <Header
          style={{
            padding: '0 5%',
            colorButton: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className='logo' style={{ fontSize: '20px', fontWeight: '500', color: '#fff' }}>NIKA.guru</div>
            <Menu onClick={onClick} mode='horizontal' items={items} />
          </div>
          {token ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '250px' }}>
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
                    {userInfo && userInfo.name}
                  </div>
                )}
              </NavLink>
            </Typography>
            <Typography
              variant='subtitle1'
              className='header__link'
              style={{ color: '#fff', cursor: 'pointer' }}
              onClick={handleChangePassword}
            >
              Change Password
            </Typography>
            <Typography
              variant='subtitle1'
              onClick={logout}
              className=' header__link'
              style={{ color: '#fff', cursor: 'pointer' }}
            >
              Logout
            </Typography>
          </div>
            : <div style={{ display: 'flex', alignItems: 'center', width: '150px', justifyContent: 'space-around ' }}>
              <Typography onClick={() => setIsModalSignin(true)}>
                Signin
              </Typography>
              <Typography onClick={() => setIsModalSignup(true)}>
                Signup
              </Typography>
            </div>}
        </Header>
      </Layout>
      <Modal
        visible={isModalSignin}
        footer={null}
        onOk={() => setIsModalSignin(false)}
        onCancel={() => setIsModalSignin(false)}
        className='modal-signin'
      >
        <SignIn setIsModalSignin={setIsModalSignin}/>
      </Modal>
      <Modal
        visible={isModalSignup}
        footer={null}
        onOk={() => setIsModalSignup(false)}
        onCancel={() => setIsModalSignup(false)}
        className='modal-signup'
      >
        <Signup setIsModalSignup={setIsModalSignup}/>
      </Modal>
      <Modal
        visible={isModalPasswordUpdate}
        onOk={() => setIsModalPasswordUpdate(false)}
        onCancel={() => setIsModalPasswordUpdate(false)}
        footer={null}
      >
        <UpdatePassword setIsModalPasswordUpdate={setIsModalPasswordUpdate}/>
      </Modal>
    </>
  )
}
export default Navbar
