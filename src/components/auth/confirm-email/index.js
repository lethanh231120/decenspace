import React, { useEffect, useState } from 'react'
import axios from 'axios'
export const ConfirmEmail = () => {
  const [message, setMessage] = useState()
  useEffect(() => {
    // Get uuid and token from browser search
    const queryParams = new URLSearchParams(window.location.search)
    const uuid = queryParams.get('uuid')
    const token = queryParams.get('token')
    console.log(token)
    const authorization = async() => {
      const instance = axios.create({
        baseURL: '/accountService'
      })
      if (token) {
        instance.defaults.headers.common['Authorization'] = token
      }
      try {
        await instance.get(`/accounts/confirm-email/uuid=${uuid}`)
        setMessage('Verify email successfully!')
      } catch (error) {
        setMessage(error?.response?.data?.message)
      }
    }
    const timer = setTimeout(() => {
      authorization()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div style={{ padding: '50px 0' }}>{message && message}</div>
  )
}
