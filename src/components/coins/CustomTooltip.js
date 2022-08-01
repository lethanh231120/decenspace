import React from 'react'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div >
        <div >
          <p >{payload[0].payload.time}</p>
          {payload[0].payload.currentPrice ? (
            <p>price: {payload[0].payload.currentPrice}</p>
          ) : (
            <p>Voltage {payload[0].payload.currentPrice}V</p>
          )}
        </div>
      </div>
    )
  }

  return null
}

export default CustomTooltip
