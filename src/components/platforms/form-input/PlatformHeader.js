import React, { memo } from 'react'
import { Typography, Image } from 'antd'
import './style.scss'
const { Text } = Typography
const PlatformHeader = ({ src, text }) => {
  return (
    <Typography className='platform-title'>
      <Text className='platform-text'>
        New Portfolio :
      </Text>
      <Image
        width={30}
        preview={false}
        src={src}
      />
      <Text style={{ color: '#fff', marginLeft: '10px' }}>{text}</Text>
    </Typography>
  )
}
export default memo(PlatformHeader)
