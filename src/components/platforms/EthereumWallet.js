import React from 'react'
import { Typography, Form, Button, Tabs, Select } from 'antd'
import PlatformHeader from './form-input/PlatformHeader'
import ConnectionName from './form-input/ConnectionName'
import AddressWallet from './form-input/AddressWallet'
import ButtonSubmit from './form-input/ButtonSubmit'
import { ETHEREUM_CHAINID } from '../../constants/ChainId'
// import { SearchOutlined } from '@ant-design/icons'
import { importConnectionEvm } from '../../redux/evmSlice'
import { importConnectionNft } from '../../redux/nftSlice'
import { useDispatch } from 'react-redux'
const { TabPane } = Tabs
const { Text } = Typography

const { Option } = Select
const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

export const EthereumWallet = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const onFinish = async(values) => {
    dispatch(importConnectionEvm({ data: values, chainId: ETHEREUM_CHAINID }))
    dispatch(importConnectionNft({ data: values, chainId: ETHEREUM_CHAINID }))
  }
  return (
    <div className='ethereum-wallet'>
      <PlatformHeader src='/coins/ethereum_wallet.png' text='Ethereum Wallet'/>
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
            <Typography className='ethereum-wallet-button'>
              <Text>Add your Ethereum wallet or ENS address here</Text>
            </Typography>
            <ButtonSubmit text='submit'/>
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
            <ConnectionName/>
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
