import React from 'react'
import { Typography, Image, Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { importConnection } from '../../redux/addressSlice'
const { Text } = Typography
export const Bitcoin = () => {
  const [form] = Form.useForm()
  const onFinish = async(values) => {
    await dispatch(importConnection(values))
  }
  const dispatch = useDispatch()
  return (
    <>
      <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: '30px', color: '#fff', marginRight: '10px' }}>
          New Portfolio :
        </Text>
        <Image
          width={30}
          preview={false}
          src='/bitcoin.png'
        />
        <Text style={{ color: '#fff', marginLeft: '10px' }}>Bitcoin</Text>
      </Typography>
      <Form
        onFinish={onFinish}
        autoComplete='off'
        layout='vertical'
        form={form}
      >
        <Form.Item label='Connection Name (optional)' name='connectionName'>
          <Input />
        </Form.Item>
        <Form.Item label='Wallet Address' name='address'>
          <Input />
        </Form.Item>
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
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}