import React from 'react'
import { Form } from 'antd'
import { useDispatch } from 'react-redux'
import { importConnectionBtc } from '../../redux/bitcoinSlice'
import PlatformHeader from './form-input/PlatformHeader'
import ConnectionName from './form-input/ConnectionName'
import AddressWallet from './form-input/AddressWallet'
import ButtonSubmit from './form-input/ButtonSubmit'
import './platform.scss'

export const Bitcoin = () => {
  const [form] = Form.useForm()
  const onFinish = async(values) => {
    const res = await dispatch(importConnectionBtc(values))
    console.log(res)
  }
  const dispatch = useDispatch()
  return (
    <div className='bitcoin'>
      <PlatformHeader src='/coins/bitcoin.png' text='Bitcoin'/>
      <Form
        onFinish={onFinish}
        autoComplete='off'
        layout='vertical'
        form={form}
      >
        <ConnectionName/>
        <AddressWallet/>
        <ButtonSubmit text='Submit'/>
      </Form>
    </div>
  )
}
