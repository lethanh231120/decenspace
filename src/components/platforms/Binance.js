import React from 'react'
import { Form, Tabs, Input, Row, Col, Typography } from 'antd'
import PlatformHeader from './form-input/PlatformHeader'
import ConnectionName from './form-input/ConnectionName'
import ButtonSubmit from './form-input/ButtonSubmit'
import './platform.scss'

const { TabPane } = Tabs
const { Text, Title } = Typography

export const Binance = () => {
  const [form] = Form.useForm()
  const onFinish = async(values) => {
    console.log(values)
  }
  return (
    <div className='binance'>
      <Row gutter={96}>
        <Col span='12'>
          <PlatformHeader src='/coins/binance.png' text='Binance'/>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='API Sync' key='1'>
              <Form
                onFinish={onFinish}
                autoComplete='off'
                layout='vertical'
                form={form}
              >
                <ConnectionName/>
                <Form.Item label='API key' name='apiKey'>
                  <Input placeholder='Enter Here'/>
                </Form.Item>
                <Form.Item label='API Secret' name='apiSecret'>
                  <Input placeholder='Enter Here'/>
                </Form.Item>
                <ButtonSubmit text='Connect'/>
              </Form>
            </TabPane>
            <TabPane tab='CSV' key='2'>
              <Form
                onFinish={onFinish}
                autoComplete='off'
                layout='vertical'
                form={form}
              >
                <ConnectionName/>
                <ButtonSubmit text='Connect'/>
              </Form>
            </TabPane>
          </Tabs>
        </Col>
        <Col span='12'>
          <div className='binance-box-text'>
            <Title level={2} className='binance-box-text-title'>How to Add Your Account:</Title>
            <Text className='binance-box-text-step'>1. Login to your <span className='binance-box-text-step-bold'>Binance</span> account on your computer</Text>
            <Text className='binance-box-text-step'>2. Click on <span className='binance-box-text-step-bold'>API Management</span> from your Profile icon dropdown menu on the top right</Text>
            <Text className='binance-box-text-step'>3. In <span className='binance-box-text-step-bold'>Give the API Key a Label</span> field type in what you want to call it, ex. <span className='binance-box-text-step-bold'>CoinStats Binance</span>, then click <span className='binance-box-text-step-bold'>Create</span></Text>
            <Text className='binance-box-text-step'>4. Input your <span className='binance-box-text-step-bold'>Google Authentication Code</span> (2FA) for Binance</Text>
            <Text className='binance-box-text-step'>5. Open your verification email Binance sent you and click <span className='binance-box-text-step-bold'>Confirm new API key</span></Text>
            <Text className='binance-box-text-step'>6. You can either scan the <span className='binance-box-text-step-bold'>QR code</span> with the <span className='binance-box-text-step-bold'>CoinStats</span> app by tapping <span className='binance-box-text-step-bold'>Scan QR Code</span> below and pointing the camera at the <span className='binance-box-text-step-bold'>QR code</span> on the screen, or manually copy/paste your <span className='binance-box-text-step-bold'>API</span> and <span className='binance-box-text-step-bold'>Secret Keys</span> into the app</Text>
          </div>
        </Col>
      </Row>
    </div>
  )
}
