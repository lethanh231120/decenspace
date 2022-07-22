import React from 'react'
import { Typography, Image, Form, Input, Button, Tabs, Select } from 'antd'
// import { SearchOutlined } from '@ant-design/icons'
const { TabPane } = Tabs
const { Text } = Typography

const { Option } = Select
const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

export const EthereumWallet = () => {
  const [form] = Form.useForm()
  const onFinish = async(values) => {
    console.log(values)
  }
  return (
    <div className='ethereum-wallet'>
      <Typography className='ethereum-wallet-title'>
        <Text className='ethereum-wallet-text'>
            New Portfolio :
        </Text>
        <Image
          width={30}
          preview={false}
          src='/coins/ethereum_wallet.png'
        />
        <Text style={{ color: '#fff', marginLeft: '10px' }}>Ethereum Wallet</Text>
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
            <Typography className='ethereum-wallet-button'>
              <Text>Add your Ethereum wallet or ENS address here</Text>
            </Typography>
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
            <Typography className='ethereum-wallet-text-button'>
              <Text>Automatically connect to ethereum-wallet</Text>
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
            <Typography className='ethereum-wallet-text-button'>
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
