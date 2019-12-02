export enum EMicrosoftBrowser {
  IE9 = 'IE9',
  IE10 = 'IE10',
  IE11 = 'IE11',
  Edge = 'Edge'
}

export function getMicrosoftBrowserType(): EMicrosoftBrowser | null {
  if (/MSIE 9/i.test(navigator.userAgent)) {
    return EMicrosoftBrowser.IE9;
  }

  if (/MSIE 10/i.test(navigator.userAgent)) {
    return EMicrosoftBrowser.IE10;
  }

  if (/rv:11.0/i.test(navigator.userAgent)) {
    return EMicrosoftBrowser.IE11;
  }

  if (/Edge\/\d./i.test(navigator.userAgent)) {
    return EMicrosoftBrowser.Edge;
  }

  return null;
}
