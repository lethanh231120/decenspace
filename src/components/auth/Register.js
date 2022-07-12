import React from 'react'
import { Checkbox } from 'antd'

const Register = () => {
  return (
    <div className='register-form'>
      <div className='register-form__checkbox'>
        <Checkbox>
          <span>Agree with <a>Privacy Policy</a></span>
        </Checkbox>
      </div>
      <div className='register-form__button'>
        <button>
          Sign up
        </button>
      </div>
      <div className='register-form__network--login'>
        <span>Or login with</span>
        <div className='register-form__network'>
          <img
            className='coinbase-icon'
            src='https://content.diadata.org/wp-content/uploads/2021/10/Coinbase.svg'
            alt='coinbase icon'
          />
          <img
            className='fb-icon'
            src='https://www.seekpng.com/png/full/51-516623_facebook-transparent-background-facebook-round-logo-blue-circle.png'
            alt='fb icon'
          />
          <img
            className='twt-icon'
            src='https://www.pngkey.com/png/full/484-4846390_twitter-round-logo-transparent-clipart-computer-icons-telegram.png'
            alt='twt-icon'
          />
          <img
            className='google-icon'
            src='http://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png'
            alt='google-icon'
          />
          <img
            className='apple-icon'
            src='https://www.freeiconspng.com/uploads/apple-icon-20.png'
            alt='apple-icon'
          />
        </div>
        <div className='register-form__login-link'>
          <span> Already have an account? <a>Sign in</a></span>
        </div>
      </div>
    </div>
  )
}

export default Register
