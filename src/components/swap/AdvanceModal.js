import { Button, Input } from 'antd'
import React from 'react'
import './styles.scss'

const AdvanceModal = ({ setIsModalAdvanced }) => {
  return (
    <div className='advance__modal'>
      <div className='advance__modal--title'>
        Advanced Options
      </div>
      <div className='advance__modal--slippage'>
        <span>Slippage</span>
        <div className='advance__modal--slippage-options'>
          <Button>2%</Button>
          <Button>3%</Button>
          <Input defaultValue={0}></Input>
        </div>
      </div>
    </div>
  )
}

export default AdvanceModal
