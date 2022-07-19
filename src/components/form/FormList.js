import React from 'react'
import { Typography, Form, Input, Select } from 'antd'
import { SearchOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select
const { Text } = Typography
const children = []

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

export const FormListItem = () => {
  return (
    <Form.List name='metamask'>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div className='metamask-form-item' key={field.key}>
                <div className='metamask-form-item-icon'>
                  <CloseOutlined onClick={() => remove(field.name)} />
                </div>
                <Form.Item label='Blockchain/Crypto' name={[index, 'connectionName']}>
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
                  name={[index, 'address']}
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
            ))}
            <Form.Item>
              <Typography className='metamask-button' onClick={() => add()} block icon={<PlusOutlined />}>
                <Text><PlusOutlined /> Add another</Text>
              </Typography>
            </Form.Item>
          </div>
        )
      }}
    </Form.List>
  )
}
