export enum EEdmitColor {
  White = "#fff",
  Green = "#38b487",
  Red = "#921313",
  Grey = "#6f6868",
  DarkGrey = "#999999",
  MediumGrey = "#c9c9c9",
  LightGrey = "#f6f6f6"
}

const css = (properties: React.CSSProperties): React.CSSProperties => properties

export const withLightGreyBackground = css({
  background: EEdmitColor.LightGrey
})

export const withWhiteBackground = css({
  background: EEdmitColor.White
})

export const withLato = css({
  fontFamily: "Lato"
})