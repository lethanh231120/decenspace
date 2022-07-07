import React, { useState } from 'react'
import { Typography, Image, Form, Input, Button } from 'antd'
import ModalConnect from '../../components/modal/connect-portfolio'
import { WAITING_CONNECT } from '../../constants/TypeConstants'
const { Text } = Typography
const ConnectWallet = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [type, setType] = useState()

  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Success:', values)
    setIsModalVisible(true)
    setType(WAITING_CONNECT)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div style={{ padding: '50px 0', margin: '0px auto', width: '500px' }}>
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
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
        form={form}
      >
        <Form.Item label='Connection Name (optional)' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='Wallet Address' name='addressWallet'>
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
      <ModalConnect
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        type={type}
        setType={setType}
      />
    </div>
  )
}
export default ConnectWallet
