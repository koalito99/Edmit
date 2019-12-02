declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

declare module '*.json'

declare module 'react-sizes'
declare module 'redux-segment'

declare module 'formula-pmt' {
  const pmt = (rate: number, periods: number, present: number, future?: number, type?: number) => number;
  export default pmt;
}

declare var profitwell;

declare module 'react-sizeme';