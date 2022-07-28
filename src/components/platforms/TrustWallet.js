import React from 'react'
import { Typography, Form, Button, Tabs, Input } from 'antd'
import { PlatformHeader } from './form-input/PlatformHeader'
import { ConnectionName } from './form-input/ConnectionName'
import { useWeb3React } from '@web3-react/core'
import { Walletconnect } from './wallet-connect/Connectors'

const { TabPane } = Tabs
const { Text } = Typography
export const TrustWallet = () => {
  const [form] = Form.useForm()
  const {
    activate,
    chainId, account, active
    // deactivate
  } = useWeb3React()
  const onFinish = async(values) => {
    // console.log(values)
    activate(Walletconnect)
    // activate(Walletlink)
    // activate(Injected)
  }
  console.log(chainId, active, account)

  return (
    <div className='metamask'>
      <PlatformHeader src='/coins/trust_wallet.png' text='Trust Wallet'/>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='WalletConnect' key='1'>
          <Form
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            form={form}
          >
            <ConnectionName/>
            <Typography className='metamask-text-button'>
              <Text>Connect your Trust Wallet account with WalletConnect</Text>
            </Typography>
            <Form.Item shouldUpdate >
              {() => (
                <Button
                  type='primary'
                  htmlType='submit'
                >
                  CONTINUE WITH WALLETCONNECT
                </Button>
              )}
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab='Manual' key='2'>
          <Form
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            form={form}
          >
            <Form.Item label='Wallet Address' name='walletAddress'>
              <Input placeholder='Enter Here'/>
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
                  Connect
                </Button>
              )}
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  )
}
