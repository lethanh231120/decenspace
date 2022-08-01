import React, { useEffect, useState } from 'react'
import { Image, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Text, Title } = Typography

export const NFT = ({ item }) => {
  const [dataNft, setDataNft] = useState()
  const navigate = useNavigate()

  const handleClickDetailNFT = (nftId) => {
    navigate(`../../nft/${nftId.slice(0, 5)}`, { state: { data: item }})
  }
  useEffect(() => {
    setDataNft({
      name: item?.nft?.name,
      image: item.nft.metadata !== '' && item.nft.metadata !== undefined ? JSON.parse(item?.nft?.metadata)?.image : '',
      totalMoney: item?.price * item?.nft?.amount * (1 / Math.pow(10, 18))
    })
  }, [item])

  return (
    <div className='nft-header-item' onClick={() => handleClickDetailNFT(item?.nft?.token_id)}>
      <Image src={dataNft?.image !== '' ? dataNft?.image : '/coins/nft.png'} preview={false}/>
      <div className='nft-header-item-content'>
        <Title className='nft-header-item-name' level={5}>{dataNft && dataNft.name}</Title>
        <Text className='nft-header-item-price'>
          ${dataNft && dataNft?.totalMoney?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </Text>
      </div>
    </div>
  )
}
