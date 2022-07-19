import React, { useState } from 'react'
import { Typography, Image, Form, Input, Button, Tabs, Select, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './platform.scss'
import { FormListItem } from '../form/FormList'
import { ethers } from 'ethers'
const { TabPane } = Tabs
const { Text } = Typography
const { Option } = Select

const children = []
const { ethereum } = window
const provider = new ethers.providers.Web3Provider(window.ethereum)
const abc = new ethers.providers.Web3Provider(window.ethereum, 'any')
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

export const Metamask = () => {
  const [data, setdata] = useState({
    address: '',
    Balance: null
  })
  const [form] = Form.useForm()

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
    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      const balance = await provider.getBalance(accounts[0])
      const bal = ethers.utils.formatEther(balance)
      setdata({
        address: accounts[0],
        Balance: bal
      })

      const network = await abc.getNetwork()
      console.log(network)
      // const chainId = network.chainId
      await ethereum.on('chainChanged', (_chainId) => window.location.reload())
    } else {
      return error()
    }
  }

  return (
    <div className='metamask'>
      <Typography className='metamask-title'>
        <Text className='metamask-text'>
          New Portfolio :
        </Text>
        <Image
          width={30}
          preview={false}
          src='/coins/metamask.png'
        />
        <Text style={{ color: '#fff', marginLeft: '10px' }}>MetaMask</Text>
      </Typography>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='MetaMask' key='1'>
          <Form
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            form={form}
          >
            <Form.Item label='Connection Name (optional)' name='connectionName'>
              <Input placeholder='Connection Name (optional)'/>
            </Form.Item>
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
              <Form.Item
                label='Wallet Address'
                name={['form', 'address']}
                rules={[
                  {
                    min: 20,
                    message: 'Address wallet must be minimum 20 characters.'
                  }
                ]}
              >
                <Input />
              </Form.Item>
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
        <TabPane tab='Walletconnect' key='3'>
          <Form
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            form={form}
          >
            <Form.Item name='connectionName'>
              <Input placeholder='Connection Name (optional)'/>
            </Form.Item>
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
      <div>
        <strong>Address: </strong>
        {data.address}
      </div>
      <div>
        <strong>Balance: </strong>
        {data.Balance}
      </div>
    </div>
  )
}
