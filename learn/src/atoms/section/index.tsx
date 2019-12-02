import * as React from 'react'
import { Element } from 'react-scroll'

const Block = ({ id, children }) => {
  return (
    <Element name={id} className="section mb5">
      {children}
    </Element>
  )
}

export default Block
