import React from 'react'
import { Typography, Form, Button, Tabs } from 'antd'
import { ConnectionName } from './form-input/ConnectionName'
import { AddressWallet } from './form-input/AddressWallet'
import { PlatformHeader } from './form-input/PlatformHeader'
import { BINANCE_SMART_CHAIN_CHAINID } from '../../constants/ChainId'
import { importConnectionEvm } from '../../redux/evmSlice'
import { useDispatch } from 'react-redux'
const { TabPane } = Tabs
const { Text } = Typography

export const BinanceSmartChain = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const onFinish = async(values) => {
    console.log(values)
    dispatch(importConnectionEvm({ data: values, chainId: BINANCE_SMART_CHAIN_CHAINID }))
  }

  return (
    <div className='binance-smart-chain'>
      <PlatformHeader src='/coins/binance_smart_chain.png' text='Binance Smart Chain'/>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Manual' key='1'>
          <Form
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            form={form}
          >
            <ConnectionName/>
            <AddressWallet/>
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
            <ConnectionName/>
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
            <ConnectionName/>
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
