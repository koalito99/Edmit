import * as React from 'react'

const CardRow = ({ children, wrap }) => {
  return (
    <div className={'flex-l justify-between' + (wrap ? ' flex-wrap' : '')}>
      {children}
    </div>
  )
}

export default CardRow
