import React, { memo } from 'react'
import { Form, Input } from 'antd'

const ConnectionName = () => {
  return (
    <Form.Item label='Connection Name (optional)' name='connectionName'>
      <Input placeholder='Connection Name (optional)'/>
    </Form.Item>
  )
}
export default memo(ConnectionName)
