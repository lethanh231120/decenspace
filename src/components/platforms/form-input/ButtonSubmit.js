import React from 'react'
import { Form, Button } from 'antd'

export const ButtonSubmit = ({ text }) => {
  const [form] = Form.useForm()
  return (
    <Form.Item shouldUpdate >
      {() => (
        <Button
          type='primary'
          htmlType='submit'
          disabled={
            !form.isFieldsTouched(true) ||
            form.getFieldsError().filter(({ errors }) => errors.length)
              .length > 0
          }
        >
          {text}
        </Button>
      )}
    </Form.Item>
  )
}
