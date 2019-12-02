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

export interface IScholarshipSetDetailViewModel {
  title: string;
  description: string;
  features: string[];
  majors: Array<{ id: string; name: string; }>;
  selectedMajor: { id: string; name: string; } | null;
  testScores: {
    gpa: string | null;
    sat: number | null;
    act: number | null;
    psat: number | null;
  }
}

export interface IScholarshipSetDetailActions {
  onChangeFeatures?: (newFeatures: string[]) => void;
  onSelectMajor?: (major: { id: string; name: string; } | null) => void;
  onChangeGPA?: (gpa: string | null) => void;
  onChangeACT?: (act: number | null) => void;
  onChangeSAT?: (sat: number | null) => void;
  onChangePSAT?: (psat: number | null) => void;
}

type ScholarshipSetDetailProps = IScholarshipSetDetailViewModel & IScholarshipSetDetailActions

export const ScholarshipSetDetail: React.SFC<ScholarshipSetDetailProps> = props => {
  const scrollPos = useScroll()
  const collapsed = scrollPos > 150

  const featuresIncludes = (...otherFeatures: string[]) => {
    return props.features.filter(value => otherFeatures.includes(value)).length >= 1
  }

  const sizeFeatures = [featureIds.SIZE_UNDER_1000, featureIds.SIZE_1000_TO_5000,
    featureIds.SIZE_5000_TO_10000,
    featureIds.SIZE_10000_TO_20000,
    featureIds.SIZE_ABOVE_20000];

  const featuresWithNewSize = (newSizeFeature: string): string[] => {
    const featuresWithoutSizes = props.features.filter(value => value !== newSizeFeature);
    return !props.features.includes(newSizeFeature) ? [...featuresWithoutSizes, newSizeFeature] : featuresWithoutSizes;
  }

  const publicPrivateFeatures = [featureIds.TYPE_PUBLIC, featureIds.TYPE_PRIVATE];

  const featuresWithNewPublicPrivate = (newPublicPrivateFeature: string): string[] => {
    const featuresWithoutPublicPrivate = props.features.filter(value => !publicPrivateFeatures.includes(value) && value !== newPublicPrivateFeature);
    return !props.features.includes(newPublicPrivateFeature) ? [...featuresWithoutPublicPrivate, newPublicPrivateFeature] : featuresWithoutPublicPrivate;
  }

  return (
    <>
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
        <div style={{ userSelect: 'auto' }}>
          <div className="" style={{ backgroundColor: hexBlue }}>
            <div className="bb b--dark-gray ph3 ph0-ns w-70-ns ma-auto">
              <Heading
                size={!collapsed ? EHeadingSize.H2 : EHeadingSize.H4}
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
                  <div className={'mb3 flex justify-center'}>
                    <Search
                      name={''}
                      placeholder={
                        'Search more colleges by city, scholarships…'
                      }
                      options={[]}
                      onSearch={() => null}
                      className={'w-90 w-50-ns'}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={'nav-compare tc bg-white shadow-nav flex flex-wrap pv2 ph6-ns'}>
          <FilterMenu feature={'Size'} active={featuresIncludes(...sizeFeatures)} onApply={() => null}>
            <ToggleButton selected={featuresIncludes(featureIds.SIZE_UNDER_1000)} onToggle={() => props.onChangeFeatures(featuresWithNewSize(featureIds.SIZE_UNDER_1000))} className={"ma1"}>Under 1000 students</ToggleButton>
            <ToggleButton selected={featuresIncludes(featureIds.SIZE_1000_TO_5000)} onToggle={() => props.onChangeFeatures(featuresWithNewSize(featureIds.SIZE_1000_TO_5000))} className={"ma1"}>1,000 to 5,000 students</ToggleButton>
            <ToggleButton selected={featuresIncludes(featureIds.SIZE_5000_TO_10000)} onToggle={() => props.onChangeFeatures(featuresWithNewSize(featureIds.SIZE_5000_TO_10000))} className={"ma1"}>5,000 to 10,000 students</ToggleButton>
            <ToggleButton selected={featuresIncludes(featureIds.SIZE_10000_TO_20000)} onToggle={() => props.onChangeFeatures(featuresWithNewSize(featureIds.SIZE_10000_TO_20000))} className={"ma1"}>10,000 to 20,000 students</ToggleButton>
            <ToggleButton selected={featuresIncludes(featureIds.SIZE_ABOVE_20000)} onToggle={() => props.onChangeFeatures(featuresWithNewSize(featureIds.SIZE_ABOVE_20000))} className={"ma1"}>Above 20,000 students</ToggleButton>
          </FilterMenu>
          <FilterMenu feature={'Public/Private'} active={featuresIncludes(...publicPrivateFeatures)} onApply={() => null}>
            <Text className={"mt0"}>Do you have a preference for public or private?</Text>
            <ToggleButton selected={featuresIncludes(featureIds.TYPE_PUBLIC)} className={"ma1"} onToggle={() => props.onChangeFeatures(featuresWithNewPublicPrivate(featureIds.TYPE_PUBLIC))}>Public</ToggleButton>
            <ToggleButton selected={featuresIncludes(featureIds.TYPE_PRIVATE)} className={"ma1"} onToggle={() => props.onChangeFeatures(featuresWithNewPublicPrivate(featureIds.TYPE_PRIVATE))}>Private</ToggleButton>
          </FilterMenu>
          <FilterMenu feature={'Major'} active={Boolean(props.selectedMajor)} onApply={() => null}>
            <Text className={"mt0"}>Do you know what you want to study?</Text>
            <Text className={"i"}>It’s ok if you don’t.</Text>
            <FormFieldSelect
              required={false}
              value={props.selectedMajor && props.selectedMajor.id || undefined}
              onSelect={id => props.onSelectMajor(props.majors.find(major => major.id === id))}
              className={'mw5'}
              barStyle
            >
              <option selected={true} key={-1} value={""}>
                Select a major
              </option>
              {sortBy(props.majors, m => m.name).map(m => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </FormFieldSelect>
          </FilterMenu>
          <FilterMenu feature={'GPA & Test Scores'} active={Boolean(props.testScores.gpa || props.testScores.act || props.testScores.sat || props.testScores.psat)} onApply={() => null}>
            <div className={"flex flex-wrap"}>
              <div className={"w4 ma1"}><FormFieldText label={"GPA"} required={false} value={props.testScores.gpa} onChange={props.onChangeGPA} /></div>
              <div className={"w4 ma1"}><FormFieldNumber label={"ACT"} required={false} value={props.testScores.act} onChange={props.onChangeACT} /></div>
              <div className={"w4 ma1"}><FormFieldNumber label={"SAT"} required={false} value={props.testScores.sat} onChange={props.onChangeSAT} /></div>
              <div className={"w4 ma1"}><FormFieldNumber label={"PSAT"} required={false} value={props.testScores.psat} onChange={props.onChangePSAT} /></div>
            </div>
          </FilterMenu>
        </div>
      </Navbar>
    </>
  )
}
