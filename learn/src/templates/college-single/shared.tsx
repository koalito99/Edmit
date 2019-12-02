import * as React from 'react'
import { hexBlue, hexWhite } from '@edmit/component-library/src/components/atoms/colors'
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import Navbar from '@edmit/component-library/src/components/molecules/navbar'
import DetailedIcon from '@edmit/component-library/src/components/atoms/icon-detailed'
import { Link as ScrollLink } from 'react-scroll/modules'
import { useScroll } from '../../components/hooks'
import { ECollegeBadge, iconForBadge } from './index'

export interface ICollegeSingleDetailActions { }

export interface ICollegeSingleDetailViewModel {
  college: {
    name: string
    location: string
    badges: ECollegeBadge[]
  }
}

type CollegeSingleDetailProps = ICollegeSingleDetailActions &
  ICollegeSingleDetailViewModel

export const CollegeSingleDetail: React.SFC<
  CollegeSingleDetailProps
> = props => {
  const scrollPos = useScroll()
  const collapsed = scrollPos > 150

  return (
    <>
      <Navbar
        fixed={true}
        top={22}
        zIndex={997}
        className="college-single-nav"
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 0,
          marginRight: 0,
          maxWidth: 'unset',
        }}
      >
        <div style={{ userSelect: 'auto' }}>
          <div className="" style={{ backgroundColor: hexBlue }}>
            <div className="bb b--dark-gray w-70 ma-auto">
              <Heading
                size={!collapsed ? EHeadingSize.H1 : EHeadingSize.H1}
                text={props.college.name}
                className={`tc ${!collapsed ? 'pt4' : 'pt3'}`}
                style={{ color: hexWhite }}
              />
              {!collapsed && (
                <Text
                  className={'t-large tc pb2 i'}
                  style={{ color: hexWhite }}
                >
                  {props.college.location}
                </Text>
              )}
            </div>
            {!collapsed && (
              <div>
                <div className={"flex justify-center flex-wrap pb1"}>
                  {Object.keys(ECollegeBadge).map((key, i, arr) => {
                    const badge = ECollegeBadge[key];
                    return <DetailedIcon name={iconForBadge(badge, props.college.badges.indexOf(badge) === -1)} style={{ width: 150, height: 150, opacity: props.college.badges.indexOf(badge) > -1 ? 1 : 0.5 }} className={(i < arr.length - 1 ? "mr2" : "")} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={'nav-compare tc bg-white shadow-nav'}>
          <div className={'dib'}>
            <ScrollLink
              hashSpy={false}
              to="cost"
              spy={true}
              smooth={true}
              duration={500}
              offset={-300}
              className={`pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu`}
            >
              Cost
            </ScrollLink>
            <ScrollLink
              hashSpy={false}
              to="financial-aid"
              spy={true}
              smooth={true}
              duration={500}
              offset={-300}
              className="pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu"
            >
              Financial Aid
            </ScrollLink>
            <ScrollLink
              hashSpy={false}
              to="scholarships"
              spy={true}
              smooth={true}
              duration={500}
              offset={-300}
              className="pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu"
            >
              Scholarships
            </ScrollLink>
            <ScrollLink
              hashSpy={false}
              to="budget"
              spy={true}
              smooth={true}
              duration={500}
              offset={-300}
              className="pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu"
            >
              Budget
            </ScrollLink>
            <ScrollLink
              hashSpy={false}
              to="loans"
              spy={true}
              smooth={true}
              duration={500}
              offset={-300}
              className="pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu"
            >
              Loans
            </ScrollLink>
            <ScrollLink
              hashSpy={false}
              to="salaries"
              spy={true}
              smooth={true}
              duration={500}
              offset={-300}
              className="pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu"
            >
              Salaries
            </ScrollLink>
            <ScrollLink
              hashSpy={false}
              href="https://edmit.me/browse"
              to="browse-colleges"
              spy={true}
              smooth={true}
              duration={500}
              offset={-300}
              className="pointer lato inline-flex self-stretch items-center pa2 ph3-ns no-underline fw7 t-medium gray-dim hover-crimson relative report-link-menu"
            >
              Browse Colleges
            </ScrollLink>
          </div>
        </div>
      </Navbar>
    </>
  )
}

export const CollegeSectionHeader: React.SFC<{ name: string }> = props => {
  return (
    <Heading
      size={EHeadingSize.H3}
      text={props.name}
      className="tc ma0 pt4"
      style={{ fontWeight: 700 }}
    />
  )
}
