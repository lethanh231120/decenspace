import React, { useEffect } from 'react'
import { Typography, Form, Button, Tabs, Modal } from 'antd'
import ConnectionName from './form-input/ConnectionName'
import AddressWallet from './form-input/AddressWallet'
import PlatformHeader from './form-input/PlatformHeader'
import { BINANCE_SMART_CHAIN_CHAINID } from '../../constants/ChainId'
import { importConnectionEvm } from '../../redux/evmSlice'
import { useDispatch } from 'react-redux'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { walletconnect } from './wallet-connect/Connectors'

const { TabPane } = Tabs
const { Text } = Typography
const { ethereum } = window
const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.getDefaultProvider())

export const BinanceSmartChain = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { activate, chainId, account } = useWeb3React()

  const error = () => {
    Modal.error({
      title: 'Oops, Something Went Wrong',
      content: (
        <div className='modal'>
          <p>MetaMask Extension Not Found</p>
        </div>
      ),
      onOk() {}
    })
  }

  const onFinish = async(values) => {
    dispatch(importConnectionEvm({ data: values, chainId: BINANCE_SMART_CHAIN_CHAINID }))
  }

  const onFinishMetamask = async(values) => {
    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      const data = {
        connectionName: values.connectionName !== undefined ? values.connectionName : 'Metamask',
        address: accounts[0]
      }
      const chain = await provider.getNetwork()
      await dispatch(importConnectionEvm({ data, chainId: chain.chainId }))
    } else {
      return error()
    }
  }

  const onFinishWallet = () => {
    activate(walletconnect)
  }

  useEffect(() => {
    const data = {
      connectionName: 'Metamask',
      address: account
    }
    chainId !== undefined && account !== undefined && dispatch(importConnectionEvm({ data, chainId }))
  }, [chainId, account])

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
            onFinish={onFinishMetamask}
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
            onFinish={onFinishWallet}
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
