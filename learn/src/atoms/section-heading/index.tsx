import * as React from 'react'

interface SectionHeadingProps {
  children: string[]
}

export default (props: SectionHeadingProps) => (
  <h2 className="mv0 lato black f2 f1-l lh-solid relative pl4">
    <span
      className="absolute left-0 top-0 bottom-0"
      style={{
        width: '10px',
        background: 'linear-gradient(45deg, #921313 0%, #e36e6e 100%)',
      }}
    />
    {props.children}
  </h2>
)
