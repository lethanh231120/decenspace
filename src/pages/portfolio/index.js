import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import './styles.scss'
import WalletAddress from '../../components/portfolio/WalletAddress'
import Analyst from '../../components/portfolio/analyst/Analyst'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { getPriceCoinByPeriod } from '../../redux/coinsPriceSlice'
import { useQuery } from '@tanstack/react-query'
import { get } from '../../api/bitcoinService'
import { getEvm } from '../../api/evmService'
import { getNFT } from '../../api/nftService'

const Portfolio = () => {
  const [connectionName, setConnectionName] = useState('all')
  const [dataConnection, setDataConnection] = useState({})
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [params, setParams] = useState({ coinId: 'bitcoin', time: '1d' })
  const [holdings, setHoldings] = useState([])
  const [isGroupNFT, setIsGroupNFT] = useState(false)
  const dispatch = useDispatch()
  const { status_btc } = useSelector(state => state.connectionBtc)
  const { status_evm } = useSelector(state => state.connectionEvm)
  const { data_coin_price } = useSelector(state => state.coinPrice)

  // cache
  const { data: holding_btc } = useQuery(
    ['holding_btc'],
    async() => {
      const dataBtc = await get('bitcoin/holdings')
      return dataBtc?.data
    }
  )

  const { data: holding_evm } = useQuery(
    ['holding_evm'],
    async() => {
      const dataEvm = await getEvm('evm/holdings')
      return dataEvm?.data
    }
  )

  const { data: list_nft_nvm, isLoading } = useQuery(
    ['list_nft_nvm'],
    async() => {
      const dataNFT = await getNFT('nft/nfts')
      return dataNFT.data
    }
  )

  useEffect(() => {
    const data = []
    if (holding_btc) {
      data.push(...holding_btc)
    }
    if (holding_evm) {
      data.push(...holding_evm)
    }
    setHoldings(data)
  }, [holding_evm, holding_btc])

  useEffect(() => {
    dispatch(getPriceCoinByPeriod(params))
  }, [params])

  useEffect(() => {
    setIsGroupNFT(false)
  }, [connectionName])

  useEffect(() => {
    if (connectionName !== 'all') {
      const findNft = holdings && holdings?.find((item) => item.connection.id === parseInt(connectionName))
      const dataNftByAddress = (list_nft_nvm && list_nft_nvm?.find((item) => item?.address?.address === findNft?.address?.address))
      const dataHolding = holdings && holdings?.filter((item) => item?.connection?.id === parseInt(connectionName))
      const connectionHolding = []
      dataHolding?.map((item) => item?.holdings && connectionHolding.push(...item.holdings))
      setDataConnection({
        'holdings': connectionHolding,
        'nft': [dataNftByAddress?.collectionNFTs]
      })
    } else {
      const allHolding = []
      const allNft = []
      list_nft_nvm && list_nft_nvm.map((item) => {
        allNft.push(item.collectionNFTs)
      })
      holdings.map((item) => item?.holdings && allHolding.push(...item.holdings))
      setDataConnection({
        'holdings': allHolding,
        'nft': allNft
      })
    }
  }, [connectionName, holdings, list_nft_nvm])

  const addDataIntoCache = (cacheName, url, response) => {
    const data = new Response(JSON.stringify(response))
    if ('caches' in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, data)
      })
    }
  }

  useEffect(() => {
    holdings && addDataIntoCache('MyCache', 'https://localhost:3000', holdings)
  }, [holdings])

  const handleTabClick = (e) => {
    setConnectionName(e)
  }

  return (
    <div style={{ overflowY: 'hidden' }}>
      <Row>
        <Col span={6}>
          <WalletAddress
            connectionName={connectionName}
            holdings={holdings.length > 0 && holdings}
            status_evm={status_evm}
            setIsModalEdit={setIsModalEdit}
            isModalEdit={isModalEdit}
            handleTabClick={handleTabClick}
          />
        </Col>
        <Col span={18}>
          <Analyst
            status={status_btc}
            setParams={setParams}
            params={params}
            data_coin_price={data_coin_price}
            dataConnection={!_.isEmpty(dataConnection) && dataConnection}
            setIsGroupNFT={setIsGroupNFT}
            isGroupNFT={isGroupNFT}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Portfolio
