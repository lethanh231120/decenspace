import React, { useState } from 'react'
import ModalConnect from '../../components/modal/connect-portfolio'
const ConnectPortfolio = () => {
  const [isModalVisible, setIsModalVisible] = useState(true)

  return (
    <div>
      <ModalConnect
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  )
}
export default ConnectPortfolio
