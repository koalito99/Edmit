import * as React from 'react';
import Truncate from 'react-truncate';
import ReactTable from 'react-table';
import { Formik } from 'formik';
import withSizes from 'react-sizes';
import Color from 'color';

import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import LoadingText from '../../atoms/loading/text';
import Icon, { EIconName } from '../../atoms/icon';
import Text, { ETextType } from '../../atoms/typography/text';
import { hexCrimson, hexCrimsonDark, hexGrayLight, hexGreen } from '../../atoms/colors';
import FormFieldCurrency from '../../atoms/form/form-field-currency';
import FormFieldFile from "../../atoms/form/form-field-file";
import EdmitTooltip, { ETooltipType } from "../tooltip";
import { AppealsUploadAidLetterButton } from '../../../../../client/src/testIds/ids';

interface ISegmentedProgressBarViewModel {
  completedSegments: number;
  totalSegments: number;

  style?: React.CSSProperties;
  className?: string;
}

type SegmentedProgressBarProps = ISegmentedProgressBarViewModel;

const SegmentedProgressBar: React.SFC<SegmentedProgressBarProps> = props => {
  const allSegmentsAreComplete = props.completedSegments === props.totalSegments;

  return (
    <div style={props.style} className={'w-100 mh1 ' + props.className}>
      <div className={'w-100 inline-flex v-mid'}>
        {Array.from(Array(props.totalSegments).keys()).map((_, i) => {
          const isComplete = i < props.completedSegments;

          return (
            <div
              key={i}
              style={{
                backgroundColor: isComplete
                  ? Color(hexCrimson)
                    .mix(Color(hexCrimsonDark), i / props.totalSegments)
                    .hex()
                  : hexGrayLight,
                width: `${100 / props.totalSegments}%`
              }}
              className={`ba b--white`}
            >
              <Text
                type={ETextType.Label}
                className={`tc f6 white mv1`}
                style={{ opacity: isComplete ? 1 : 0 }}
              >
                {i + 1}
              </Text>
            </div>
          );
        })}
      </div>
      <Icon
        name={EIconName.Success}
        className={'ml1'}
        style={{ verticalAlign: 'middle', color: allSegmentsAreComplete ? hexGreen : hexGrayLight }}
      />
    </div>
  );
};

export interface IAppealsProgressTableViewModel {
  data: Array<{
    id: string;
    name: string;
    awardedAidAmount: number | null;
    hasDraftLetter: boolean;
    appealResult: number | null;
    edstimate: number;
  }>;

  isSuperUser?: boolean;
  isMobile?: boolean;
  isEdmitPlus?: boolean;

  loading: boolean;
}

export interface IAppealsProgressTableActions {
  onScheduleConsult?: (collegeId: string) => void;
  onUploadFinAidLetter?: (
    college: {
      edstimate: number;
      id: string;
      name: string;
    }
  ) => void;
  onSUUploadDraftAidLetter?: (
    college: {
      id: string;
      name: string;
      file: File;
    }
  ) => void;
  onSetAppealAmount?: (collegeId: string, appealAmount: number | null) => void;
  onRequestDraftLetterUrl?: (collegeId: string) => Promise<string | null>;
}

type AppealsProgressTableProps = IAppealsProgressTableViewModel & IAppealsProgressTableActions;

const AppealsProgressTable: React.SFC<AppealsProgressTableProps> = props => {
  const progress = (original: IAppealsProgressTableViewModel['data'][0]) => (
    <div className="w-100 tl">
      <SegmentedProgressBar
        completedSegments={
          !original.awardedAidAmount
            ? 0
            : !original.hasDraftLetter
              ? 1
              : !original.appealResult
                ? 2
                : 3
        }
        totalSegments={3}
      />
      <div style={{ opacity: original.hasDraftLetter ? 1 : 0 }} className={'mt2'}>
        <span
          className={original.hasDraftLetter ? 'hidden' : ''}
          style={{
            color: 'unset',
            cursor: original.hasDraftLetter ? 'pointer' : 'not-allowed',
            textDecoration: 'none'
          }}
          onClick={async () => {
            if (typeof window == "undefined") return;

            const draftLetterUrl = props.onRequestDraftLetterUrl && await props.onRequestDraftLetterUrl(original.id) || null;

            if (draftLetterUrl) {
              window.location.href = draftLetterUrl;
            }
          }}
        >
          <Icon name={EIconName.Download} className={'crimson mr1'} />
          <span>Download Appeal Letter</span>
        </span>
      </div>
    </div>
  );

  const nextStep = (original: IAppealsProgressTableViewModel['data'][0]) => (
    <div className="flex justify-end items-center">
      {!original.awardedAidAmount ? (
        <Button
          testId={AppealsUploadAidLetterButton}
          className={'ml3'}
          type={EButtonType.Secondary}
          size={EButtonSize.Small}
          text={'Upload Aid Letter'}
          onClick={() =>
            props.onUploadFinAidLetter &&
            props.onUploadFinAidLetter({
              edstimate: original.edstimate,
              id: original.id,
              name: original.name
            })
          }
        />
      ) : !original.hasDraftLetter ? (
        <div>
          <Button
            size={EButtonSize.Small}
            type={EButtonType.Primary}
            text={'Schedule a Consult'}
            onClick={() => props.onScheduleConsult && props.onScheduleConsult(original.id)}
          />
        </div>
      ) : (
            <div className={'w4'}>
              <Formik initialValues={{ result: original.appealResult }} enableReinitialize onSubmit={(values) => {
                if (props.onSetAppealAmount) {
                  props.onSetAppealAmount(original.id, values.result)
                }
              }}>
                {({ values, setFieldValue, submitForm }) => (
                  <FormFieldCurrency
                    label={<span>Additional Aid <EdmitTooltip type={ETooltipType.Help}
                      text={'Enter the additional money you received (grants and scholarships) on top of what the college originally offered you.'}
                      position={'top'} /></span>}
                    required={false}
                    value={values.result || undefined}
                    onChange={val => setFieldValue('result', val)}
                    onBlur={submitForm}
                  />
                )}
              </Formik>
            </div>
          )}
    </div>
  );

  const superUserActions = (original: IAppealsProgressTableViewModel['data'][0]) => {
    return <FormFieldFile name={'draftLetter'} label={'Upload Draft Aid Letter'} buttonSize={EButtonSize.Small}
      value={null} onChange={file => {
        if (file && props.onSUUploadDraftAidLetter) {
          props.onSUUploadDraftAidLetter({
            file,
            id: original.id,
            name: original.name
          })
        }
      }} />
  };

  const tableColumns = [
    {
      Cell: (cellProps: any) => {
        const original: IAppealsProgressTableViewModel['data'][0] = cellProps.original;

        return (
          <span className="w-100 flex flex-row items-center">
            {props.loading ? (
              <div className="ml1 flex-auto">
                <LoadingText width={70} />
              </div>
            ) : (
                <div className={'w-100'}>
                  <div className="ml1 flex-auto merriweather black t-medium">
                    <Truncate>{cellProps.value}</Truncate>
                  </div>
                  {props.isMobile && <>
                    <div className={'mt2'}>{progress(original)}</div>
                    <div className={'mt2'}>{nextStep(original)}</div>
                    {props.isSuperUser && <div className={"mt2 flex justify-end items-center"}>
                      <div>
                        <div className={'mt1 f6 tr'}>Super User Actions</div>
                        {superUserActions(original)}
                      </div>
                    </div>}
                  </>}
                </div>
              )}
          </span>
        );
      },
      Header: props.loading ? '' : <span className="pv2 inline-flex">College</span>,
      accessor: 'name',
      minWidth: props.isMobile ? 30 : 140,
      resizable: false
    },
    {
      Cell: (cellProps: any) => {
        const original: IAppealsProgressTableViewModel['data'][0] = cellProps.original;

        return props.loading ? (
          <div className="flex justify-center" style={{ width: 50 }}>
            <LoadingText width={100} />
          </div>
        ) : (
            progress(original)
          );
      },
      Header: props.loading ? '' : <span className="pv2 inline-flex">Progress</span>,
      accessor: 'progress',
      minWidth: props.isMobile ? 22 : 80,
      resizable: false,
      show: !props.isMobile,
      sortable: false
    },
    {
      Cell: (cellProps: any) => {
        const original: IAppealsProgressTableViewModel['data'][0] = cellProps.original;

        return props.loading ? (
          <div className="flex justify-end" style={{ width: 50 }}>
            <LoadingText width={100} />
          </div>
        ) : (
            nextStep(original)
          );
      },
      Header: props.loading ? '' : <span className="pv2 inline-flex">Next Step</span>,
      accessor: 'nextStep',
      minWidth: props.isMobile ? 22 : 80,
      resizable: false,
      show: !props.isMobile,
      sortable: false
    },
    {
      Cell: (cellProps: any) => {
        const original: IAppealsProgressTableViewModel['data'][0] = cellProps.original;

        return props.loading ? (
          <div className="flex justify-end" style={{ width: 50 }}>
            <LoadingText width={100} />
          </div>
        ) : (
            superUserActions(original)
          );
      },
      Header: props.loading ? '' : <span className="pv2 inline-flex">Super User Actions</span>,
      accessor: 'superUserStep',
      minWidth: props.isMobile ? 22 : 80,
      resizable: false,
      show: props.isSuperUser && !props.isMobile,
      sortable: false,
    }
  ];

  return (
    <div className="gray-dim w-100">
      <ReactTable
        className="ReactTable-appeals-progress"
        data={props.data}
        columns={tableColumns}
        showPagination={false}
        showPaginationTop={false}
        showPaginationBottom={false}
        showPageSizeOptions={false}
        pageSize={props.data.length}
      />
    </div>
  );
};

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 640
});

export default withSizes(mapSizesToProps)(AppealsProgressTable) as typeof AppealsProgressTable;
