import React, { useCallback, useEffect, useState } from 'react'
import { Typography, Row, Col, Space, Spin } from 'antd'
import './style.scss'
import { NFTGroup } from './NFTGroup'
import { ListNftGroup } from './ListNftGroup'
const { Text, Title } = Typography

export const ListNFT = ({ dataConnection, isGroupNFT, setIsGroupNFT, isLoading }) => {
  const [listGroup, setListGroup] = useState()
  const [listNft, setListNft] = useState([])
  const [sumTotalNft, setSumTotalNft] = useState()
  const handleClickGroupNFT = (item) => {
    setListGroup(item)
    setIsGroupNFT(true)
  }

  useEffect(() => {
    const arr = []
    dataConnection?.nft ? dataConnection?.nft.map((item) => {
      item && Object.keys(item).forEach(function(key) {
        arr.push({ 'id': key, 'value': item[key] })
      })
    })
      : ''
    setListNft(arr)
  }, [dataConnection])

  const hancleBack = useCallback(() => {
    setIsGroupNFT(false)
  }, [])

  useEffect(() => {
    const calculateAllNft = () => {
      let totalAll = 0
      listNft.map((item) => {
        const totalOfGroup = item?.value?.reduce(myFunc, 0)
        function myFunc(total, currenValue) {
          const price = currenValue.price
          const amount = currenValue?.nft?.amount * (1 / Math.pow(10, 18))
          const money = price * amount
          const value = total + money
          return value
        }
        totalAll += totalOfGroup
      })
      setSumTotalNft(totalAll?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
    }
    calculateAllNft()
  }, [listNft])

  return (
    <>
      {isLoading ? (
        <Space size='middle'>
          <Spin size='large' />
        </Space>
      )
        : isGroupNFT ? (<ListNftGroup listGroup={listGroup} hancleBack={hancleBack}/>)
          : (<div className='nft'>
            <div className='nft-header'>
              <div className='nft-header-total'>
                <Text>Total Worth</Text>
                <Title level={2}>$ {sumTotalNft}</Title>
              </div>
              <div className='nft-header-count'>
                <Text>NFT Count</Text>
                <Title level={2}>{listNft?.length}</Title>
              </div>
            </div>
            <div className='nft-header-list'>
              <Row gutter={[16, 16]}>
                {listNft ? listNft.map((item, index) => (
                  <Col span={6} key={index}>
                    <div onClick={() => handleClickGroupNFT(item)}>
                      <NFTGroup item={item}/>
                    </div>
                  </Col>
                ))
                  : '' }
              </Row>
            </div>
          </div>
          )}
    </>
  )
}
