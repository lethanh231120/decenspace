import React, { useEffect, useState } from 'react'
import axios from 'axios'
export const ConfirmEmail = () => {
  const [message, setMessage] = useState()
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const uuid = queryParams.get('uuid')
    const token = queryParams.get('token')
    const authoriation = async() => {
      try {
        axios.defaults.headers.common['Authorization'] = token
        await axios.get(`accounts/confirm-email/uuid=${uuid}`)
        setMessage('Verify email successfully!')
      } catch (error) {
        console.log(error?.response?.data?.message)
      }
    }
    authoriation()
    console.log(uuid, token)
  }, [])
  return (
    <div style={{ padding: '50px 0' }}>{message && message}</div>
  )
}
