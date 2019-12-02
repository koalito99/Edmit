import * as React from 'react'
import Logo, { ELogoColor } from '../../atoms/logo'
import Text from '../../atoms/typography/text'
import Icon, { EIconName } from '../../atoms/icon'

interface IFooterViewModel {

  style?: React.CSSProperties;
  className?: string;
}

interface IFooterActions {

}

type FooterProps = IFooterViewModel & IFooterActions;

const Footer: React.FC<FooterProps> = props => {
  return (
    <div style={props.style} className={"mb3 bg-offwhite mt5 " + props.className}>
      <div className={"pa3 center"}>
        <div className={"mb5 flex flex-wrap"}>
          <div className={"mb4 mb2"}>
            <Logo color={ELogoColor.Crimson} width={100} />
            <ul className="list pa0 mt4 mh0 mb4">
              <li className="t-label fw4 gray-muted ttu tracked mt0 mb3">
                Follow us
            </li>
              <li className="dib mr3">
                <a className="f5 fw4 gray-dim hover-crimson no-underline" href="https://twitter.com/edmitedu"
                  target="_blank">
                  <Icon name={EIconName.Twitter} onClick={() => null} />
                </a>
              </li>
              <li className="dib mh3">
                <a className="f5 fw4 gray-dim hover-crimson no-underline" href="https://www.facebook.com/EdmitEDU/"
                  target="_blank">
                  <Icon name={EIconName.Facebook} onClick={() => null} />
                </a>
              </li>
              <li className="dib ml3">
                <a className="f5 fw4 gray-dim hover-crimson no-underline"
                  href="https://www.linkedin.com/company/18275035/" target="_blank">
                  <Icon name={EIconName.LinkedIn} onClick={() => null} />
                </a>
              </li>
            </ul>
            <Text>
              2 Oliver St.<br />
              8th Floor<br />
              Boston, MA 02109<br />
            </Text>
          </div>
          <div className={"mb4 mb2-l mh5"}>
            <ul className="list pa0 pb3 pb0-ns ma0">
              <li className="t-label fw4 gray-muted ttu tracked mt0 mb3">
                Company
              </li>
              <li className="mb3">
                <a href="https://edmit.me/about" className="fw7 gray-dim hover-crimson no-underline" target="_blank">
                  About Edmit
                </a>
              </li>
              <li className="mb3">
                <a className="fw7 gray-dim hover-crimson no-underline" href="https://edmit.me/pricing" target="_blank">
                  Pricing
              </a>
              </li>
              <li className="mb3">
                <a className="fw7 gray-dim hover-crimson no-underline" href="https://edmit.me/data" target="_blank">
                  Our Data
              </a>
              </li>
              <li className="mb3">
                <a className="fw7 gray-dim hover-crimson no-underline" href="https://edmit.me/blog" target="_blank">
                  Blog
              </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-100 pb4 tc lh-solid">
          <span className="t-small fw4 gray-dim link mb3 no-underline">
            © 2019 Edmit, Inc.
        </span>
          <span className="t-small fw4 gray-dim dib ph2">|</span>
          <a className="t-small fw4 gray-dim link mb3 no-underline" href="https://www.edmit.me/terms">
            Terms of Use
        </a>
          <span className="t-small fw4 gray-dim dib ph2">|</span>
          <a className="t-small fw4 gray-dim link mb3 no-underline" href="https://www.edmit.me/privacy">
            Privacy
        </a>
        </div>
      </div>
    </div>
  )
}

export default Footer