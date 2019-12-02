import * as React from 'react'

interface SectionSubHeadingProps {
  children: string[];
}

const SectionSubHeading = (props: SectionSubHeadingProps) => {
  return (
    <div className="w-100">
      <h4 className="mt0 f3 mb4 merriweather normal black-90 measure lh-copy">
        {props.children}
      </h4>
    </div>
  )
}

export default SectionSubHeading
