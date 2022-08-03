import React, { useEffect, useState } from 'react'
import ModalLoadingConnect from '../../components/modal/modal-loading-connect'
import ModalSuccessConnect from '../../components/modal/modal-success-connect'
import { platforms } from '../../utils/platforms/Platforms'
import { useSelector } from 'react-redux'
import { LOADING_IMPORT_CONNECTION, SUCCESS_IMPORT_CONNECTION } from '../../constants/StatusMessageConstants'
import { useParams } from 'react-router-dom'
import { assetStatus } from '../../constants/statusCode'

const ConnectWallet = () => {
  const { platformId } = useParams()
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [isModalSuccess, setIsModalSuccess] = useState(false)
  const [message, setMessage] = useState()
  const { status_btc, res_btc } = useSelector(state => state.connectionBtc)
  const { status_evm, res_evm } = useSelector(state => state.connectionEvm)

  useEffect(() => {
    if (status_btc && status_btc === LOADING_IMPORT_CONNECTION) {
      setIsModalLoading(true)
    }
    if (status_btc && status_btc === SUCCESS_IMPORT_CONNECTION) {
      setIsModalSuccess(true)
      setIsModalLoading(false)
    }
    res_btc && assetStatus.map((item) => {
      if (res_btc.code === item.code === 'B.ASS.400.C2') {
        setMessage({
          error: item.message
        })
      }
      if (res_btc.code === item.code === 'B.ASS.201.C1') {
        setMessage({
          message: item.message
        })
      }
    })
    if (status_evm && status_evm === LOADING_IMPORT_CONNECTION) {
      setIsModalLoading(true)
    }
    if (status_evm && status_evm === SUCCESS_IMPORT_CONNECTION) {
      setIsModalSuccess(true)
      setIsModalLoading(false)
    }
    res_evm && assetStatus.map((item) => {
      if (res_evm.code === item.code === 'B.ASS.400.C2') {
        setMessage({
          error: item.message
        })
      }
      if (res_evm.code === item.code === 'B.ASS.201.C1') {
        setMessage({
          message: item.message
        })
      }
    })
  }, [status_btc, status_evm])

  const render = () => {
    const abc = platforms.find((item) => {
      if (platformId === item.id) {
        return (item)
      }
    })
    return abc
  }

  return (
    <div>
      {render().platform}
      <ModalLoadingConnect
        isModalLoading={isModalLoading}
        setIsModalLoading={setIsModalLoading}
        setIsModalSuccess={setIsModalSuccess}
        message={message?.error}
      />
      <ModalSuccessConnect
        isModalSuccess={isModalSuccess}
        setIsModalSuccess={setIsModalSuccess}
        message={message?.message}
      />
    </div>
  )
}
export default ConnectWallet
