import React, { useEffect, useState } from 'react'
import { Image, Typography } from 'antd'
const { Text, Title } = Typography

export const NFTGroup = ({ item }) => {
  const [itemGroup, setItemGroup] = useState()
  useEffect(() => {
    let money = 0
    const image = []
    let name = ''
    item?.value && item?.value?.map((nft) => {
      image.push((nft.nft.metadata !== '' && nft.nft.metadata !== undefined) ? JSON.parse(nft?.nft?.metadata)?.image : '')
      name = nft?.nft?.name ? nft?.nft?.name : ''
      money += nft.price * nft?.nft?.amount
    })
    setItemGroup({
      totalMoney: money * (1 / Math.pow(10, 18)),
      image,
      name,
      numOfItem: item?.value.length
    })
  }, [item])

  return (
    <div className='nft-header-item'>
      <Image src={itemGroup?.image[0] !== '' ? itemGroup?.image[0] : '/coins/nft.png'} preview={false}/>
      <div className='nft-header-item-content'>
        <Title className='nft-header-item-name' level={5}>{itemGroup && itemGroup?.name}</Title>
        <Text className='nft-header-item-price'>
          ${itemGroup && itemGroup?.totalMoney?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </Text>
      </div>
      <div className='nft-header-item-count'>
        {itemGroup && itemGroup?.numOfItem} <Image src='/layer.png' preview={false}/>
      </div>
    </div>
  )
}
