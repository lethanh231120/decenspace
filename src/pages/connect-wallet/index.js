import React, { useEffect, useState } from 'react'
import ModalLoadingConnect from '../../components/modal/modal-loading-connect'
import ModalSuccessConnect from '../../components/modal/modal-success-connect'
import { platforms } from '../../utils/platforms/Platforms'
import { useSelector } from 'react-redux'
import { LOADING_IMPORT_CONNECTION, SUCCESS_IMPORT_CONNECTION } from '../../constants/StatusMessageConstants'
import { useParams } from 'react-router-dom'

const ConnectWallet = () => {
  const { platformId } = useParams()
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [isModalSuccess, setIsModalSuccess] = useState(false)

  const { status } = useSelector(state => state.connections)

  useEffect(() => {
    if (status && status === LOADING_IMPORT_CONNECTION) {
      setIsModalLoading(true)
    }
    if (status && status === SUCCESS_IMPORT_CONNECTION) {
      setIsModalSuccess(true)
      setIsModalLoading(false)
    }
  }, [status])

  const render = () => {
    const abc = platforms.find((item) => {
      if (platformId === item.id) {
        return (item)
      }
    })
    return abc
  }

  return (
    <div style={{ padding: '50px 0', margin: '0px auto', width: '500px' }}>
<<<<<<< HEAD
      {render().platform}
=======
      <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: '30px', color: '#fff', marginRight: '10px' }}>
          New Portfolio :
        </Text>
        <Image
          width={30}
          preview={false}
          src='/bitcoin.png'
        />
        <Text style={{ color: '#fff', marginLeft: '10px' }}>Bitcoin</Text>
      </Typography>
      <Form
        onFinish={onFinish}
        autoComplete='off'
        layout='vertical'
        form={form}
      >
        <Form.Item label='Connection Name (optional)' name='connectionName'>
          <Input />
        </Form.Item>
        <Form.Item label='Wallet Address' name='address'>
          <Input />
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
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
>>>>>>> 07c61fd (fix netlify)
      <ModalLoadingConnect
        isModalLoading={isModalLoading}
        setIsModalLoading={setIsModalLoading}
        setIsModalSuccess={setIsModalSuccess}
      />
      <ModalSuccessConnect
        isModalSuccess={isModalSuccess}
        setIsModalSuccess={setIsModalSuccess}
      />
    </div>
  )
}
export default ConnectWallet
