import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Typography } from 'antd'
import { accountConfirmEmailStatus } from '../../../constants/statusCode'
import RecendEmail from './RecendEmail'
const { Text } = Typography
export const ConfirmEmail = () => {
  const [message, setMessage] = useState()
  const [openModalRecen, setOpenModalRecend] = useState(false)
  const handleRecendEmail = () => {
    setOpenModalRecend(true)
  }
  useEffect(() => {
    // Get uuid and token from browser search
    const queryParams = new URLSearchParams(window.location.search)
    const uuid = queryParams.get('uuid')
    const token = queryParams.get('token')
    const authorization = async() => {
      const instance = axios.create({
        baseURL: '/accountService'
      })
      if (token) {
        instance.defaults.headers.common['Authorization'] = token
      }
      try {
        const res = await instance.get(`/accounts/confirm-email/uuid=${uuid}`)
        res && accountConfirmEmailStatus.map((item) => {
          if (item.code === res.code) {
            setMessage({
              success: item.message
            })
          }
        })
      } catch (error) {
        error?.response?.data && accountConfirmEmailStatus.map((item) => {
          if (error?.response?.data?.code === item.code) {
            setMessage({
              error: item.message,
              errorToken: error?.response?.data?.code === 500
            })
          }
        })
      }
    }
    const timer = setTimeout(() => {
      authorization()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div style={{ padding: '50px 0' }}>
      {message?.error ? (
        <>
          <Text type='danger'>{message?.error && message?.error}</Text>
          <Text type='danger' onClick={handleRecendEmail}>{message?.errorToken && 'Recend email confirm'}</Text>
        </>
      )
        : (
          <Text>{message?.success && message?.success}</Text>
        )}
      <Modal
        className='forgot-password-modal'
        visible={openModalRecen}
        onOk={() => setOpenModalRecend(false)}
        onCancel={() => setOpenModalRecend(false)}
        footer={null}
      >
        <RecendEmail setOpenModalRecend={setOpenModalRecend}/>
      </Modal>
    </div>
  )
}
