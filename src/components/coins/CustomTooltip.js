import React from 'react'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', padding: '10px' }} className='customTooltip'>
        <div style={{ backgroundColor: 'red' }} className='tooltipDetails'>
          <p>{payload[0].payload.time}</p>
          {payload[0].payload.currentPrice && (
            <p>USD: ${payload[0].payload.currentPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
          )}
        </div>
      </div>
    )
  }

  return null
}

export default CustomTooltip
