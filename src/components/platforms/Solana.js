import React from 'react'
import { Form, Button } from 'antd'
import { PlatformHeader } from './form-input/PlatformHeader'
import { ConnectionName } from './form-input/ConnectionName'
import { AddressWallet } from './form-input/AddressWallet'
import { SOLANA_CHAINID } from '../../constants/ChainId'
import { importConnectionEvm } from '../../redux/evmSlice'
import { useDispatch } from 'react-redux'
export const Solana = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const onFinish = async(values) => {
    dispatch(importConnectionEvm({ data: values, chainId: SOLANA_CHAINID }))
  }
  return (
    <div className='bitcoin'>
      <PlatformHeader src='/coins/solana_wallet.png' text='Solana Wallet'/>
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
    </div>
  )
}
