import React from 'react'
import { Typography, Image, Form, Input, Button, Tabs } from 'antd'
// import { SearchOutlined } from '@ant-design/icons'
const { TabPane } = Tabs
const { Text } = Typography

export const BinanceSmartChain = () => {
  const [form] = Form.useForm()
  const onFinish = async(values) => {
    console.log(values)
  }

  return (
    <div className='binance-smart-chain'>
      <Typography className='binance-smart-chain-title'>
        <Text className='binance-smart-chain-text'>
          New Portfolio :
        </Text>
        <Image
          width={30}
          preview={false}
          src='/coins/binance_smart_chain.png'
        />
        <Text style={{ color: '#fff', marginLeft: '10px' }}>Binance Smart Chain</Text>
      </Typography>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Manual' key='1'>
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
        </TabPane>
        <TabPane tab='Metamask' key='2'>
          <Form
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            form={form}
          >
            <Form.Item label='Connection Name (optional)' name='connectionName'>
              <Input placeholder='Connection Name (optional)'/>
            </Form.Item>
            <Typography className='binance-smart-chain-text-button'>
              <Text>Automatically connect to binance-smart-chain</Text>
            </Typography>
            <Form.Item shouldUpdate >
              {() => (
                <Button
                  type='primary'
                  htmlType='submit'
                  // disabled={
                  //   !form.isFieldsTouched(true) ||
                  //   form.getFieldsError().filter(({ errors }) => errors.length)
                  //     .length > 0
                  // }
                >
                  Connect
                </Button>
              )}
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab='WalletConnect' key='3'>
          <Form
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            form={form}
          >
            <Form.Item name='connectionName'>
              <Input placeholder='Connection Name (optional)'/>
            </Form.Item>
            <Typography className='binance-smart-chain-text-button'>
              <Text>Connect your Binance Smart Chain account with WalletConnect</Text>
            </Typography>
            <Form.Item shouldUpdate >
              {() => (
                <Button
                  type='primary'
                  htmlType='submit'
                  // disabled={
                  //   !form.isFieldsTouched(true) ||
                  //   form.getFieldsError().filter(({ errors }) => errors.length)
                  //     .length > 0
                  // }
                >
                  CONTINUE WITH WALLETCONNECT
                </Button>
              )}
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  )
}
