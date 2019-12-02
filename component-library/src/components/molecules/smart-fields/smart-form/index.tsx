import * as React from 'react'

interface ISmartFormViewModel {

}

interface ISmartFormActions {}

type SmartFormProps = ISmartFormViewModel & ISmartFormActions;

const SmartForm: React.FC<SmartFormProps> = props => {
  return (
    <>
      {props.children}
    </>
  )
}

export type ConnectedSmartFormProps = SmartFormProps & {
  updateOnBlur: boolean;
};

export default SmartForm