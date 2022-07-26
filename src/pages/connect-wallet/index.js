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

  const { status_btc } = useSelector(state => state.connectionBtc)

  useEffect(() => {
    if (status_btc && status_btc === LOADING_IMPORT_CONNECTION) {
      setIsModalLoading(true)
    }
    if (status_btc && status_btc === SUCCESS_IMPORT_CONNECTION) {
      setIsModalSuccess(true)
      setIsModalLoading(false)
    }
  }, [status_btc])

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
      />
      <ModalSuccessConnect
        isModalSuccess={isModalSuccess}
        setIsModalSuccess={setIsModalSuccess}
      />
    </div>
  )
}
export default ConnectWallet
