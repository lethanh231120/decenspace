import React from 'react'
import { Form, Input } from 'antd'

export const AddressWallet = () => {
  return (
    <Form.Item
      label='Wallet Address'
      name='address'
      rules={[
        {
          min: 20,
          message: 'Address wallet must be minimum 20 characters.'
        }
      ]}
    >
      <Input />
    </Form.Item>
  )
}
