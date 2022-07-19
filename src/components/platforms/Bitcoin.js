import React from 'react'
import { Typography, Image, Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { importConnection } from '../../redux/addressSlice'
import './platform.scss'
const { Text } = Typography
export const Bitcoin = () => {
  const [form] = Form.useForm()
  const onFinish = async(values) => {
    await dispatch(importConnection(values))
  }
  const dispatch = useDispatch()
  return (
    <div className='bitcoin'>
      <Typography className='bitcoin-title'>
        <Text className='bitcoin-text'>
          New Portfolio :
        </Text>
        <Image
          width={30}
          preview={false}
          src='/coins/bitcoin.png'
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
    </div>
  )
}
