import React, { useEffect, useState } from 'react'
import axios from 'axios'
export const ConfirmEmail = () => {
  const [message, setMessage] = useState()
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const uuid = queryParams.get('uuid')
    const token = queryParams.get('token')
    const authoriation = async() => {
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
      authoriation()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div style={{ padding: '50px 0' }}>{message && message}</div>
  )
}
