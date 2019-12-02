import * as React from 'react'

export const PageSection: React.SFC<{ top?: boolean }> = props => {
  return <div className={props.top ? 'mt5' : 'mt4'}>{props.children}</div>
}

export const OffWhiteSection: React.SFC<{
  className?: string
  style?: React.CSSProperties
}> = props => {
  return (
    <div
      className={
        'mt3 flex flex-wrap w-100 bg-offwhite ' + (props.className)
      }
      style={props.style}
    >
      {props.children}
    </div>
  )
}

export const Single: React.SFC = props => {
  return <div className={'center pa3 w-100 w-50-m'}>{props.children}</div>
}

export const OneHalf: React.SFC<{
  className?: string
  style?: React.CSSProperties
}> = props => {
  return (
    <div
      className={'center pa3 w-100 mt0-ns mt3 w-50-ns ' + props.className}
      style={props.style}
    >
      {props.children}
    </div>
  )
}

export const OneThird: React.SFC<{ className?: string }> = props => {
  return (
    <div
      className={'center pa3 w-100 mt0-ns mt3 w-third-ns ' + props.className}
    >
      {props.children}
    </div>
  )
}