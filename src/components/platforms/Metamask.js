import React from 'react'
import { Typography, Form, Button, Tabs, Select, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './platform.scss'
import { FormListItem } from '../form/FormList'
import ConnectionName from './form-input/ConnectionName'
import PlatformHeader from './form-input/PlatformHeader'
import AddressWallet from './form-input/AddressWallet'
import { ethers } from 'ethers'
import { importConnectionEvm } from '../../redux/evmSlice'
import { useDispatch } from 'react-redux'
const { TabPane } = Tabs
const { Text } = Typography
const { Option } = Select
const children = []
const { ethereum } = window
const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.getDefaultProvider())
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

export const Metamask = () => {
  const [form] = Form.useForm()

  const dispatch = useDispatch()
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

  if (ethereum) {
    console.log('MetaMask is installed!')
  } else {
    alert('Bạn chưa cài đặt metamask')
  }

  const onFinish = async(values) => {
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

  return (
    <div className='metamask'>
      <PlatformHeader src='/coins/metamask.png' text='Metamask'/>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='MetaMask' key='1'>
          <Form
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            form={form}
          >
            <ConnectionName/>
            <Typography className='metamask-text-button'>
              <Text>Automatically connect to Metamask</Text>
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
        <TabPane tab='Manual' key='2'>
          <Form
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            form={form}
          >
            <div className='metamask-form-item'>
              <Form.Item label='Blockchain/Crypto' name={['form', 'connectionName']}>
                <Select
                  showSearch
                  suffixIcon={<SearchOutlined />}
                  size='middle'
                  placeholder='Search to Select'
                  optionFilterProp='children'
                  filterOption={(input, option) => option.children.includes(input)}
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {children}
                </Select>
              </Form.Item>
              <AddressWallet/>
            </div>
            <FormListItem/>
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
            <Typography className='metamask-text-button'>
              <Text>Connect your MetaMask account with WalletConnect</Text>
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
      {/* <div>
        <strong>Address: </strong>
        {data.address}
      </div>
      <div>
        <strong>Balance: </strong>
        {data.Balance}
      </div> */}
    </div>
  )
}
