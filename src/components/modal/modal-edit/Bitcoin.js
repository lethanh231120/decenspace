import React, { useEffect } from 'react'
import { Modal, Button, Form, Input } from 'antd'
import { updateConnectionBtc } from '../../../redux/bitcoinSlice'
import { useDispatch, useSelector } from 'react-redux'
import { SUCCESS_UPDATE_CONNECTION } from '../../../constants/StatusMessageConstants'
const ModalEdit = ({ isModalEdit, setIsModalEdit, dataEdit }) => {
  // const navigate = useNavigate()

  const dispatch = useDispatch()
  const { status_btc } = useSelector(state => state.connectionBtc)
  const handleOk = () => {
    setIsModalEdit(false)
  }
  useEffect(() => {
    if (status_btc && status_btc === SUCCESS_UPDATE_CONNECTION) {
      setIsModalEdit(false)
    }
  }, [status_btc])

  const handleCancel = () => {
    setIsModalEdit(false)
  }

  // const handleClickSeePortfolio = () => {
  //   navigate('../portfolio')
  // }

  const onFinish = async(values) => {
    dispatch(updateConnectionBtc({ id: dataEdit.id, data: values }))
  }
  return (
    <Modal
      visible={isModalEdit}
      onOk={handleOk}
      layout='vertical'
      onCancel={handleCancel}
      footer={null}
      className='modal-style'
      bodyStyle={{ height: '50vh', overflow: 'hidden' }}
      width={400}
    >
      <Form
        name='basic'
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        initialss={{
          remember: true
        }}
        onFinish={onFinish}
        autoComplete='off'
      >

        <Form.Item
          label='Connection Name'
          name='connectionName'
        >
          <Input placeholder={dataEdit && dataEdit.connectionName}/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ModalEdit
