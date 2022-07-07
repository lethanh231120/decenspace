import React from 'react'
import { Button } from 'antd'
import { WAITING_CONNECT, SUCCESS_CONNECT, PORTFOLIO_CONNECT } from '../../../constants/TypeConstants'
const ModalFooter = ({ type, setType }) => {
  const handleClickSkip = () => {
    setType(SUCCESS_CONNECT)
  }
  return (
    <div style={{ textAlign: 'center' }}>
      {type === WAITING_CONNECT ? (
        <Button className='button' onClick={handleClickSkip}>SKIP</Button>)
        : type === PORTFOLIO_CONNECT ? (
          <>
            portfolio
          </>
        )
          : ''}
    </div>
  )
}
export default ModalFooter
