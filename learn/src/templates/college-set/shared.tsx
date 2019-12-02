import * as React from 'react'
import {
  hexBlue,
  hexWhite,
} from '@edmit/component-library/src/components/atoms/colors'
import Heading, {
  EHeadingSize,
} from '@edmit/component-library/src/components/atoms/typography/heading'
import Text from '@edmit/component-library/src/components/atoms/typography/text'
import Navbar from '@edmit/component-library/src/components/molecules/navbar'
import { useScroll } from '../../components/hooks'
import Search from '@edmit/component-library/src/components/atoms/search'
import FormFieldText from '@edmit/component-library/src/components/atoms/form/form-field-text'
import FormFieldNumber from '@edmit/component-library/src/components/atoms/form/form-field-number'
import { featureIds } from '@edmit/component-library/src/shared/features'
import ToggleButton from '../../atoms/toggle-button'
import FilterMenu from '../../molecules/filter-menu'
import { sortBy } from 'lodash-es'
import FormFieldSelect from '@edmit/component-library/src/components/atoms/form/form-field-select'

export interface ICollegeSetDetailViewModel {
  title: string;
  description: string;
  features: string[];
  metroAreas: Array<{ id: string; name: string; }>;
  states: Array<{ id: string; name: string; }>;
  majors: Array<{ id: string; name: string; }>;
  selectedMajor: { id: string; name: string; } | null;
  selectedMetroArea: { id: string; name: string; } | null;
  selectedState: { id: string; name: string; } | null;
  testScores: {
    gpa: string | null;
    sat: number | null;
    act: number | null;
  }
}

export interface ICollegeSetDetailActions {
  onChangeFeatures?: (newFeatures: string[]) => void;
  onSelectMajor?: (major: { id: string; name: string; } | null) => void;
  onChangeGPA?: (gpa: string | null) => void;
  onChangeACT?: (act: number | null) => void;
  onChangeSAT?: (sat: number | null) => void;
}

type CollegeSetDetailProps = ICollegeSetDetailViewModel & ICollegeSetDetailActions

const MAJOR = "Major"
const PUBLIC_PRIVATE = "Public / Private"
const SIZE = "Size"
const GPA_AND_TEST_SCORES = "SAT, ACT, GPA"

const FilterBar: React.FC = (props) => {
  return (
    <div className={'nav-compare tc bg-white shadow-nav flex flex-wrap pv2 ph6-ns'}>
      {props.children}
    </div>
  )
}

export const CollegeSetDetail: React.SFC<CollegeSetDetailProps> = props => {
  const scrollPos = useScroll()
  const collapsed = scrollPos > 150

  const featuresIncludes = (...otherFeatures: string[]) => {
    return props.features.filter(value => otherFeatures.includes(value)).length >= 1
  }

  const sizeFeatures = [
    featureIds.SIZE_UNDER_1000,
    featureIds.SIZE_1000_TO_5000,
    featureIds.SIZE_5000_TO_10000,
    featureIds.SIZE_10000_TO_20000,
    featureIds.SIZE_ABOVE_20000
  ];

  const featuresWithNewSize = (newSizeFeature: string): string[] => {
    const featuresWithoutSizes = props.features.filter(value => value !== newSizeFeature);
    return !props.features.includes(newSizeFeature) ? [...featuresWithoutSizes, newSizeFeature] : featuresWithoutSizes;
  }

  const publicPrivateFeatures = [
    featureIds.TYPE_PUBLIC,
    featureIds.TYPE_PRIVATE
  ];

  const featuresWithNewPublicPrivate = (newPublicPrivateFeature: string): string[] => {
    const featuresWithoutPublicPrivate = props.features.filter(value => !publicPrivateFeatures.includes(value) && value !== newPublicPrivateFeature);
    return !props.features.includes(newPublicPrivateFeature) ? [...featuresWithoutPublicPrivate, newPublicPrivateFeature] : featuresWithoutPublicPrivate;
  }

  const gpaAndTestScoresFilterActive = Boolean(props.testScores.gpa || props.testScores.act || props.testScores.sat)

  const nav = (
    <div>
      <div style={{ backgroundColor: hexBlue }}>
        <div className="bb b--dark-gray ph3 ph0-ns w-70-ns ma-auto">
          <Heading
            size={!collapsed ? EHeadingSize.H1 : EHeadingSize.H1}
            text={props.title}
            className={`tc ${!collapsed ? 'pt4' : 'pt3'}`}
            style={{ color: hexWhite }}
          />
          {!collapsed && (
            <>
              <Text
                className={'t-large tc pb2 i'}
                style={{ color: hexWhite }}
              >
                {props.description}
              </Text>
            </>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <Navbar
        fixed={true}
        top={22}
        zIndex={997}
        className="college-set-nav"
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 0,
          marginRight: 0,
          maxWidth: 'unset',
        }}
      >
        <div style={{ userSelect: 'auto' }}>{nav}</div>
      </Navbar>
      <div style={{ userSelect: 'none', opacity: 0 }}>
        { nav }
      </div>
    </div>
  )
}