import React from 'react'
import { Form } from 'antd'
import { PlatformHeader } from './form-input/PlatformHeader'
import { ConnectionName } from './form-input/ConnectionName'
import { AddressWallet } from './form-input/AddressWallet'
import { ButtonSubmit } from './form-input/ButtonSubmit'

export const Solana = () => {
  const [form] = Form.useForm()
  const onFinish = async(values) => {
    console.log(values)
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
        <ButtonSubmit text='Submit'/>
        {/* <Form.Item shouldUpdate >
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
        </Form.Item> */}
      </Form>
    </div>
  )
}
