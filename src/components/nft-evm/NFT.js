import React from 'react'
import { Image, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Text, Title } = Typography

export const NFT = () => {
  const navigate = useNavigate()

  const handleClickDetailNFT = (id) => {
    navigate(`../../portfolio/nft/${id}`)
  }

  return (
    <div className='nft-header-item' onClick={() => handleClickDetailNFT('1')}>
      <Image src='/coins/binance.png' preview={false}/>
      <div className='nft-header-item-content'>
        <Title className='nft-header-item-name' level={5}>Ethernal Elves Sentinels </Title>
        <Text className='nft-header-item-price'>$485.72</Text>
      </div>
      <div className='nft-header-item-count'>
        1 <Image src='/layer.png' preview={false}/>
      </div>
    </div>
  )
}
