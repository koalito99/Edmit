import * as React from "react";

export interface IWithClassNameProp {
  className?: string;
  style?: any;
}

export interface IWithFlexItemChildren {
  children: React.ReactElement<FlexItemProps> | React.ReactElement<FlexItemProps>[]
}

export const FlexWrappingContainer: React.FC<IWithClassNameProp> = (props) => {
  return (
    <div {...props} className={`flex flex-wrap ${props.className}`}>{props.children}</div>
  )
}

export const FlexRowContainer: React.FC<IWithClassNameProp> = (props) => {
  return (
    <div {...props} className={`flex flex-row ${props.className}`}>{props.children}</div>
  )
}

export const FlexColumnContainer: React.FC<IWithClassNameProp> = (props) => {
  return (
    <div className={`flex flex-column ${props.className}`}>{props.children}</div>
  )
}

export const MobileHidden: React.FC<IWithClassNameProp> = (props) => {
  return (
    <div className={`dn db-ns`}>{props.children}</div>
  )
}

export const DesktopHidden: React.FC<IWithClassNameProp> = (props) => {
  return (
    <div className={`dn-ns`}>{props.children}</div>
  )
}

type FlexItemProps = IWithClassNameProp

export const FlexItem: React.FC<FlexItemProps> = (props) => {
  return (<div {...props}>{props.children}</div>)
}