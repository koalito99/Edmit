import * as React from 'react'
import numeral from 'numeral'
import Truncate from 'react-truncate'
import ReactTable from 'react-table'
import {
  ECollegeApplicationStatus,
  ECollegeStatusMyColleges,
  edstimateCopy,
  EFinancialGrade,
  EPersonType,
  EAffordabilityDetermination,
  EValueDetermination,
  financialGradeSortDecreasing,
  financialGradeSortIncreasing,
} from '../../../shared'
import LoadingText from '../../atoms/loading/text'
import EdmitTooltip, { ETooltipType } from '../tooltip'
import { FitChip } from '../graph/fit'
import Icon, { EIconName } from '../../atoms/icon'
import { hexGrayDim, hexGrayLight } from '../../atoms/colors'
import FormFieldSelect from '../../atoms/form/form-field-select'
import FormFieldCheckbox from '../../atoms/form/form-field-checkbox'
import Button, { EButtonSize, EButtonType } from '../../atoms/button'
import TextLink from '../../atoms/link-text'
import Card from '../../atoms/card'
import Text from '../../atoms/typography/text'

export interface IMyCollegesTableViewModel {
  colleges: Array<{
    id: string;
    collegeInfo: {
      collegeAbbreviation: string;
      collegeName: string;
    };
    collegeStatusMyColleges: ECollegeStatusMyColleges;
    firstYearEarnings: number;
    effectiveCost: number;
    edstimate: number;
    calculationsUseAidAward: boolean;
    financialAidAward: number | null;
    scholarship: string | null;
    financialGrade: EFinancialGrade;
    stickerPrice: number;
    admissionUnlikely: boolean;
    hasMyMajor: boolean;
    aidOffer: {
      award: number | null;
    };
    applicationStatus: ECollegeApplicationStatus;
    affordabilityDetermination: EAffordabilityDetermination;
    valueDetermination: EValueDetermination;
  }>;

  personType: EPersonType;
  highlightedColumns: Array<
    | 'collegeInfo'
    | 'hasMyMajor'
    | 'stickerPrice'
    | 'edstimatePrice'
    | 'aidOffer'
    | 'discount'
    | 'firstYearEarnings'
    | 'fitScore'
    | 'collegeIsActive'
    | 'collegeStatusMyColleges'
    | 'applicationStatus'
    | 'actualCost'
  >;

  mobileTable: boolean;
  tabletTable: boolean;

  showAddInsteadOfView?: boolean;
  loading: boolean;

  getIsChecked: (key: string) => boolean;
  setIsChecked: (key: string, isChecked: boolean) => void;
  checkedCount: number;
  showActualCost: boolean;
}

export interface IMyCollegesTableActions {
  onAdd?: (collegeId: string) => void;
  onRemove?: (college: { name: string; id: string }) => void;
  onUploadFinAidLetter?: (college: { name: string; id: string; edstimate: number }) => void;
  onChangeApplicationStatus?: (collegeId: string, status: ECollegeApplicationStatus) => void;
  showEdstimateModal: (modal: { collegeId: string } | null) => void;
}

type MyCollegesTableProps = IMyCollegesTableViewModel & IMyCollegesTableActions;

const MyCollegesTable: React.SFC<MyCollegesTableProps> = props => {
  const selectionCheckbox = (collegeId: string, size?: number) => (
    <FormFieldCheckbox
      checked={props.getIsChecked(collegeId)}
      onChange={value => props.setIsChecked(collegeId, !props.getIsChecked(collegeId))}
      required={false}
      size={size}
    // disabled={!props.getIsChecked(cellProps.value.id)}
    />
  );

  const edstimateValue = (collegeId: string, value: number) => (
    <span>
      <a
        onClick={() => {
          props.showEdstimateModal({ collegeId });
        }}
        title={`See how this ${edstimateCopy} is calculated`}
        className={'dib no-underline bw1 pointer'}
        style={{
          borderBottomStyle: 'dotted',
          borderBottomWidth: 1,
          borderColor: hexGrayDim
        }}
      >
        {numeral(value).format('$0,0')}
      </a>
    </span>
  );

  const actualCostValue = (
    collegeId: string,
    value: number,
    otherInfo: { calculationsUseAidAward: boolean; edstimate: number; collegeName: string },
    buttonClassName?: string
  ) => (
      <span>
        {otherInfo.calculationsUseAidAward ? (
          <>
            <span>{numeral(value).format('$0,0')}</span>
            &nbsp;&nbsp;
          <Icon
              name={EIconName.Edit}
              onClick={() =>
                props.onUploadFinAidLetter &&
                props.onUploadFinAidLetter({
                  edstimate: otherInfo.edstimate,
                  id: collegeId,
                  name: otherInfo.collegeName
                })
              }
            />
          </>
        ) : (
            <Button
              className={buttonClassName}
              type={EButtonType.Secondary}
              size={EButtonSize.Small}
              text={'Upload Aid Letter'}
              onClick={() =>
                props.onUploadFinAidLetter &&
                props.onUploadFinAidLetter({
                  edstimate: otherInfo.edstimate,
                  id: collegeId,
                  name: otherInfo.collegeName
                })
              }
            />
          )}
      </span>
    );

  if (props.mobileTable) {
    return (
      <div>
        {props.colleges
          .sort((a, b) => financialGradeSortDecreasing(a.financialGrade, b.financialGrade))
          .map((college, i) => {
            return (
              <Card className={'ph2 pt3 mt2'} key={i}>
                <div className={'flex'}>
                  <div style={{ width: 25, height: 25 }} className={'mr2'}>
                    {selectionCheckbox(college.id, 25)}
                  </div>
                  <div className={'flex items-center'}>
                    {!props.loading ? (
                      <Text className={'relative mv0 t-medium tl b pointer'} style={{ top: -2 }}>
                        <span className={'black'}>{college.collegeInfo.collegeName}</span>
                      </Text>
                    ) : (
                        <LoadingText width={80} />
                      )}
                  </div>
                </div>
                <div className={'mt3 mb3 flex'}>
                  <FitChip
                    size={40}
                    admissionUnlikely={false}
                    financialGrade={college.financialGrade}
                    loading={props.loading}
                    className={'mt1'}
                  />
                  <div className={'ml2 pl1 flex flex-column justify-center gray-dim'}>
                    <div>
                      {!props.loading ? (
                        <>
                          <span className={'lh-title mr2'}>Edstimate®:</span>
                          {edstimateValue(college.id, college.edstimate)}
                        </>
                      ) : (
                          <LoadingText width={60} />
                        )}
                    </div>
                    {college.calculationsUseAidAward && <div className="mt2">
                      {!props.loading ? (
                        <>
                          <span className={'lh-title mr2'}>Actual Cost:</span>
                          {actualCostValue(college.id, college.effectiveCost, {
                            calculationsUseAidAward: college.calculationsUseAidAward,
                            edstimate: college.edstimate,
                            collegeName: college.collegeInfo.collegeName
                          })}
                        </>
                      ) : (
                          <LoadingText width={60} />
                        )}
                    </div>}
                    <div className="mt2">
                      {!props.loading ? (
                        <>
                          <span className={'lh-title mr2'}>Published Cost:</span>
                          {numeral(college.stickerPrice).format('$0,0')}
                        </>
                      ) : (
                          <LoadingText width={60} />
                        )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
    );
  } else {
    const conditionallyHighlight = (
      accessor: IMyCollegesTableViewModel['highlightedColumns'][number]
    ) => {
      const base = {
        headerStyle: {
          transition: 'background-color 500ms'
        },
        style: {
          transition: 'background-color 500ms'
        }
      };

      return props.highlightedColumns.some(el => el === accessor)
        ? {
          headerStyle: {
            ...base.headerStyle,
            alignItems: 'center',
            alignSelf: 'stretch',
            background: hexGrayLight,
            display: 'flex',
            justifyContent: 'center',
            marginLeft: 10,
            marginRight: 10,
            padding: 10
          },
          style: {
            ...base.style,
            alignItems: 'center',
            alignSelf: 'stretch',
            background: hexGrayLight,
            display: 'flex',
            justifyContent: 'flex-end',
            marginLeft: 10,
            marginRight: 10,
            padding: 10
          }
        }
        : base;
    };

    const tableColumns = [
      {
        Cell: (cellProps: any) => {
          return (
            <span className="w-100 flex flex-row items-center">
              {props.loading ? (
                <div className="ml1 flex-auto">
                  <LoadingText width={70} />
                </div>
              ) : (
                  <span className="ml1 flex-auto merriweather black t-medium">
                    {selectionCheckbox(cellProps.value.id)}
                    <Truncate>{cellProps.value.collegeName}</Truncate>
                  </span>
                )}
            </span>
          );
        },
        Header: props.loading ? '' : <span className="pv2 inline-flex">College</span>,
        accessor: 'collegeInfo',
        minWidth: 180,
        resizable: false,
        sortMethod: (a: any, b: any, desc: any) => {
          let aName = a.collegeName;
          let bName = b.collegeName;
          // force null and undefined to the bottom
          aName = aName === null || aName === undefined ? '' : aName;
          bName = bName === null || bName === undefined ? '' : bName;
          // force any string values to lowercase
          aName = typeof aName === 'string' ? aName.toLowerCase() : aName;
          bName = typeof bName === 'string' ? bName.toLowerCase() : bName;
          // Return either 1 or -1 to indicate a sort priority
          if (aName > bName) {
            return 1;
          }
          if (aName < bName) {
            return -1;
          }
          // returning 0, undefined or any falsey value will use subsequent sorts or
          // the index as a tiebreaker
          return 0;
        },
        ...conditionallyHighlight('collegeInfo')
      },
      {
        Cell: (cellProps: any) => {
          return props.loading ? (
            <LoadingText width={70} />
          ) : (
              <span>{numeral(cellProps.value).format('$0,0')}</span>
            );
        },
        Header: props.loading ? (
          ''
        ) : (
            <span className="lh-title inline-flex flex-column items-center">{(
              <span>
                Published Cost
    </span>
            )}</span>
          ),
        accessor: 'stickerPrice',
        defaultSortDesc: true,
        minWidth: 100,
        resizable: false
      },
      {
        Cell: (cellProps: any) =>
          props.loading ? (
            <LoadingText width={70} />
          ) : (
              edstimateValue(cellProps.original.id, cellProps.value)
            ),
        Header: props.loading ? (
          ''
        ) : (
            <span className="lh-title inline-flex flex-column items-center">{(
              <span>
                {edstimateCopy}
                <EdmitTooltip
                  content={
                    <div>
                      <span>
                        The {edstimateCopy} is a proprietary calculation of what you’re likely to pay for a college,
                        after deducting financial aid and scholarships from the cost of attendance.
            </span>
                      <div className={'mt2'}>
                        <TextLink
                          to={'https://www.edmit.me/data'}
                          colorClassNames={'white hover-offwhite bw1 b--white'}
                          style={{ borderBottomStyle: 'dotted', borderBottomWidth: 1 }}
                        >
                          See how your {edstimateCopy} is calculated
              </TextLink>
                      </div>
                    </div>
                  }
                  type={ETooltipType.Help}
                  position={'top'}
                />
              </span>
            )}</span>
          ),
        accessor: 'edstimate',
        defaultSortDesc: true,
        minWidth: 100,
        resizable: false,
        ...conditionallyHighlight('edstimatePrice')
      },
      {
        Cell: (cellProps: any) => {
          return props.loading ? (
            <LoadingText width={70} />
          ) : (
              actualCostValue(
                cellProps.original.id,
                cellProps.value,
                {
                  calculationsUseAidAward: cellProps.original.calculationsUseAidAward,
                  edstimate: cellProps.original.edstimate,
                  collegeName: cellProps.original.collegeInfo.collegeName
                },
                'ml3'
              )
            );
        },
        Header: props.loading ? (
          ''
        ) : (
            <span className="lh-title inline-flex flex-column items-center">{(
              <span>
                Actual Cost
      <EdmitTooltip
                  text={`Your actual cost includes the scholarships you specified for this college.`}
                  type={ETooltipType.Help}
                  position={'top'}
                />
              </span>
            )}</span>
          ),
        accessor: 'effectiveCost',
        defaultSortDesc: true,
        minWidth: 100,
        resizable: false,
        show: props.showActualCost
      },
      {
        Cell: (cellProps: any) =>
          props.loading ? (
            <div className="flex justify-end">
              <LoadingText width={60} />
            </div>
          ) : (
              <span className={`flex flex-row items-center justify-end`}>
                {cellProps.value === EAffordabilityDetermination.Affordable && (
                  <Icon name={EIconName.Check} className={'green'} />
                )}
                {cellProps.value === EAffordabilityDetermination.NotAffordable && (
                  <Icon name={EIconName.Close} className={'brown-color-1'} />
                )}
              </span>
            ),
        Header: props.loading ? (
          ''
        ) : (
            <span className="lh-title inline-flex flex-column items-center">
              <span>Affordable</span>
            </span>
          ),
        accessor: 'affordabilityDetermination',
        defaultSortDesc: true,
        minWidth: 100,
        resizable: false,
        show: !props.tabletTable
      },
      {
        Cell: (cellProps: any) =>
          props.loading ? (
            <div className="flex justify-end">
              <LoadingText width={60} />
            </div>
          ) : (
              <span className={`flex flex-row items-center justify-end`}>
                {cellProps.value === EValueDetermination.GoodValue && (
                  <Icon name={EIconName.Check} className={'green'} />
                )}
                {cellProps.value === EValueDetermination.NotGoodValue && (
                  <Icon name={EIconName.Close} className={'brown-color-1'} />
                )}
              </span>
            ),
        Header: props.loading ? (
          ''
        ) : (
            <span className="lh-title inline-flex flex-column items-center">
              <span>Good Value</span>
            </span>
          ),
        accessor: 'valueDetermination',
        defaultSortDesc: true,
        minWidth: 100,
        resizable: false,
        show: !props.tabletTable
      },
      {
        Cell: (cellProps: any) =>
          props.loading ? (
            <div className="flex justify-end">
              <LoadingText width={60} />
            </div>
          ) : (
              <span className={`flex flex-row items-center justify-end`}>
                {cellProps.value != null ? (
                  <FitChip
                    admissionUnlikely={false}
                    financialGrade={cellProps.value}
                    loading={false}
                    size={30}
                  />
                ) : (
                    <span>
                      <EdmitTooltip
                        text={`Your GPA and test scores are lower than average for this college.`}
                        type={ETooltipType.AdmissibilityWarn}
                        position={'top'}
                      />
                    </span>
                  )}
              </span>
            ),
        Header: props.loading ? (
          ''
        ) : (
            <span className="lh-title inline-flex flex-column items-center">
              <span>
                <>
                  <span>Financial</span>
                  <span> Grade</span>
                </>
                <EdmitTooltip
                  text={`Your financial grade is a personalized measure of a college's affordability and value for you.`}
                  type={ETooltipType.Help}
                  position={'top'}
                />
              </span>
            </span>
          ),
        accessor: "financialGrade",
        sortMethod: (a: EFinancialGrade, b: EFinancialGrade) => financialGradeSortIncreasing(a, b),
        defaultSortDesc: true,
        id: 'financialGrade',
        minWidth: 100,
        resizable: false,
        ...conditionallyHighlight('fitScore')
      },
      {
        Cell: (cellProps: any) =>
          props.loading ? (
            <div className="flex justify-end" style={{ width: 50 }}>
              <LoadingText width={100} />
            </div>
          ) : (
              <span className="flex justify-end">
                <FormFieldSelect
                  name={'applicationStatus'}
                  label={''}
                  required={false}
                  value={cellProps.value}
                  onSelect={newStatus => {
                    if (props.onChangeApplicationStatus) {
                      props.onChangeApplicationStatus(
                        cellProps.original.id,
                        newStatus as ECollegeApplicationStatus
                      );
                    }

                    if (
                      props.onUploadFinAidLetter &&
                      (newStatus === ECollegeApplicationStatus.Accepted ||
                        newStatus === ECollegeApplicationStatus.Attending)
                    ) {
                      props.onUploadFinAidLetter({
                        edstimate: cellProps.original.edstimate,
                        id: cellProps.original.id,
                        name: cellProps.original.collegeInfo.collegeName
                      });
                    }

                    if (props.onRemove && newStatus === ECollegeApplicationStatus.NotAttending) {
                      props.onRemove({
                        id: cellProps.original.id,
                        name: cellProps.original.collegeInfo.collegeName
                      });
                    }
                    // TODO add aid award modal here
                  }}
                >
                  {Object.keys(ECollegeApplicationStatus).map(key => (
                    <option value={ECollegeApplicationStatus[key]}>
                      {ECollegeApplicationStatus[key]}
                    </option>
                  ))}
                </FormFieldSelect>
              </span>
            ),
        Header: props.loading ? (
          ''
        ) : (
            <span className="lh-title inline-flex flex-column items-center">
              <span>Application</span>
              <span>Status</span>
            </span>
          ),
        accessor: 'applicationStatus',
        minWidth: 100,
        resizable: false,
        sortable: false,
        ...conditionallyHighlight('applicationStatus')
      }
    ];

    const data = props.colleges.map(row => ({
      ...row,
      actualCost: row.aidOffer.award ? row.stickerPrice - row.aidOffer.award : null,
      aidAwardAmount: row.aidOffer.award,
      discount: (row.stickerPrice - row.edstimate) / row.stickerPrice,
      financialGrade: row.admissionUnlikely ? null : row.financialGrade
    })).sort(
      (a, b) => financialGradeSortIncreasing(a.financialGrade, b.financialGrade)
    ).reverse();

    return (
      <div className="gray-dim">
        <ReactTable
          className="ReactTable-my-colleges"
          data={data}
          columns={tableColumns}
          showPagination={false}
          showPaginationTop={false}
          showPaginationBottom={false}
          showPageSizeOptions={false}
          pageSize={props.colleges.length}
          defaultSorted={
            props.loading
              ? []
              : [
                {
                  desc: true,
                  id: 'financialGrade'
                }
              ]
          }
        />
      </div>
    );
  }
};

export default MyCollegesTable;
