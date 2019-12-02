import * as React from 'react'

const Card = ({ children, side, background, withImage }) => {
  return (
    <div
      className={
        'bg-white shadow-card min-h-100' +
        (side === 'left' ? ' mr2-l' : side === 'right' ? ' ml2-l' : ' w-100') +
        (withImage ? ' flex pa0' : ' pa4')
      }
      style={{
        background,
      }}
    >
      {children}
    </div>
  )
}

export default Card
