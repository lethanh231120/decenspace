import React from 'react'
import { Form, Input } from 'antd'

export const ConnectionName = () => {
  return (
    <Form.Item label='Connection Name (optional)' name='connectionName'>
      <Input placeholder='Connection Name (optional)'/>
    </Form.Item>
  )
}
