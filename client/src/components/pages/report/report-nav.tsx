import * as React from "react";
import Navbar from "@edmit/component-library/src/components/molecules/navbar";
import { Sticky } from "react-sticky";
import { Link as ScrollLink } from 'react-scroll';
import { EReportType } from './shared'

export const ReportSectionNavigation: React.SFC<{ type: EReportType }> = (props) => {
  return (
    <Navbar
      fixed={true}
      top={114}
      zIndex={997}
      classNameContainer="nav-compare"
      className="report-stickyNav"
      height={38}
    >
      <Sticky>
        {({ style, isSticky }: { style: React.CSSProperties; isSticky: boolean }) => {
          return (
            <div className="report-stickyNavInn"
              style={{
                ...style,
                position: isSticky ? 'fixed' : 'relative',
                top: isSticky ? '114px' : '',
                userSelect: "none"
              }}
            >
              <ScrollLink
                hashSpy={true}
                to="cost"
                spy={true}
                smooth={true}
                duration={500}
                offset={-160}
                className={`pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu ${!isSticky ? 'active' : ''}`}>
                Your Cost
              </ScrollLink>
              <ScrollLink
                hashSpy={true}
                to="affordability"
                spy={true}
                smooth={true}
                duration={500}
                offset={-160}
                className="pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu"
              >
                Your Affordability
              </ScrollLink>
              <ScrollLink
                hashSpy={true}
                to="value"
                spy={true}
                smooth={true}
                duration={500}
                offset={-160}
                className="pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu"
              >
                Your Value
              </ScrollLink>
              {props.type === EReportType.Single && <ScrollLink
                hashSpy={true}
                to="loan-payments"
                spy={true}
                smooth={true}
                duration={500}
                offset={-160}
                className="pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu"
              >
                Your Loan Payments
              </ScrollLink>}
              <ScrollLink
                hashSpy={true}
                to="grade"
                spy={true}
                smooth={true}
                duration={500}
                offset={-160}
                className="pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu"
              >
                Your Financial Grade
              </ScrollLink>
            </div>
          );
        }}
      </Sticky>
    </Navbar>
  )
}