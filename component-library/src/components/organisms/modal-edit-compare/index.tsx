import * as React from 'react';
import SlideoutEditCompareCollege from '../../molecules/slideout-edit-compare-college';
import Heading, { EHeadingSize } from '../../atoms/typography/heading';
import Text from '../../atoms/typography/text';
import { ECollegeStatusCompare, ECompareStatus } from '../../../shared';
import LoadingText, { ELoadingTextSize } from '../../atoms/loading/text';
import Modal from '../../molecules/modal';
import { EButtonSize } from '../../atoms/button';
import FormSubmit, { ESubmitState } from '../../atoms/form/form-submit';
import { Formik } from 'formik';
import { ConnectedSearchCollegesProps } from '../../molecules/search-colleges'

export interface ICompareEditModalViewModel {
  compareStatus: ECompareStatus;
  compareEditActive: boolean;
  compareColleges: Array<{
    id: string;
    name: string;
    abbreviation: string;
    logoSrc: string | null;
  }>;
  isEdmitPlusUser: boolean;
  loading: boolean;
  addToHandCollegeSearchComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;
}

export interface ICompareEditModalActions {
  onUpgradeToPlus: () => void;
  onAddToHand: (collegeId: string) => void;
  onRemoveFromHand: (collegeId: string) => void;
  onStopEditing: () => void;
  getReport?: () => void;
}

type CompareEditModalProps = ICompareEditModalViewModel & ICompareEditModalActions;

const CompareEditModal = (props: CompareEditModalProps) => {
  let showErrorMessage = false;

  switch (props.compareStatus) {
    case ECompareStatus.Full:
      showErrorMessage = true;
      break;
    case ECompareStatus.NotFull:
      break;
    default:
      throw Error();
  }

  const SearchColleges = props.addToHandCollegeSearchComponent;

  return (
    <div
      className="fixed dib w-80 w-60-l"
      style={{
        top: 0,
        transform: `translateY(${props.compareEditActive ? '96px' : 'calc(-100% - 1px)'})`,
        transition: 'transform 400ms ease-in-out 0s',
        zIndex: 997
      }}
    >
      {props.loading ? (
        <Modal
          maxWidth={760}
          onClose={props.onStopEditing}
          onClickOut={props.onStopEditing}
          isOpen={props.compareEditActive}
        >
          <div className="pa4">
            <div className="flex flex-column flex-row-ns">
              <div className="mb4 mb0-ns mr4-ns nt3 w-100 w-50-ns">
                <LoadingText size={ELoadingTextSize.H3} width={80} />
                <SlideoutEditCompareCollege
                  college={{
                    abbreviation: '',
                    id: '',
                    logoSrc: '',
                    name: '',

                    statusCompare: ECollegeStatusCompare.Added
                  }}
                  compareStatus={props.compareStatus}
                  loading={props.loading}
                />
                <SlideoutEditCompareCollege
                  college={{
                    abbreviation: '',
                    id: '',
                    logoSrc: '',
                    name: '',

                    statusCompare: ECollegeStatusCompare.Added
                  }}
                  compareStatus={props.compareStatus}
                  loading={props.loading}
                />
                <SlideoutEditCompareCollege
                  college={{
                    abbreviation: '',
                    id: '',
                    logoSrc: '',
                    name: '',

                    statusCompare: ECollegeStatusCompare.Added
                  }}
                  compareStatus={props.compareStatus}
                  loading={props.loading}
                />
              </div>
              <div className="ml4-ns pt2 w-100 w-50-ns">
                <LoadingText width={50} />
                <SlideoutEditCompareCollege
                  college={{
                    abbreviation: '',
                    id: '',
                    logoSrc: '',
                    name: '',

                    statusCompare: ECollegeStatusCompare.Added
                  }}
                  compareStatus={props.compareStatus}
                  loading={props.loading}
                />
                <SlideoutEditCompareCollege
                  college={{
                    abbreviation: '',
                    id: '',
                    logoSrc: '',
                    name: '',

                    statusCompare: ECollegeStatusCompare.Added
                  }}
                  compareStatus={props.compareStatus}
                  loading={props.loading}
                />
                <div className="nb3">
                  <LoadingText size={ELoadingTextSize.H3} width={100} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          maxWidth={760}
          onClose={props.onStopEditing}
          onClickOut={props.onStopEditing}
          isOpen={props.compareEditActive}
        >
          <div className="pa4">
            <div className="flex flex-column flex-row-ns">
              <div className="mb4 mb0-ns mr4-ns w-100 w-50-ns">
                <Heading
                  size={EHeadingSize.H4}
                  text={props.getReport ? 'Colleges in Report' : 'Colleges in Report'}
                  className="mt0 mb3"
                />
                {props.compareColleges.map(college => (
                  <SlideoutEditCompareCollege
                    key={college.id}
                    college={{ ...college, statusCompare: ECollegeStatusCompare.Added }}
                    compareStatus={props.compareStatus}
                    loading={props.loading}
                    removeFromHand={() =>
                      props.onRemoveFromHand && props.onRemoveFromHand(college.id)
                    }
                  />
                ))}
              </div>
              <div className="ml4-ns pt2 w-100 w-50-ns">
                <div className="search-small-container mt3">
                  <Formik<{ query: string }>
                    initialValues={{
                      query: ''
                    }}
                    onSubmit={() => null}
                  >
                    {({ values, setFieldValue }) => (
                      <SearchColleges
                        inputValue={values.query}
                        onSearch={newQuery => setFieldValue('query', newQuery)}
                        onSelected={option => props.onAddToHand(option.id)}
                      />
                    )}
                  </Formik>
                </div>
              </div>
            </div>
            {!props.getReport ? (
              <Text className="mt3 mb0 t-small tc i">
                {showErrorMessage && (
                  <span>
                    You've reached the maximum number of colleges for a comparison; please remove a
                    college to add a new one
                    {!props.isEdmitPlusUser && (
                      <span>
                        , or{' '}
                        <span
                          className="no-underline fw7 crimson hover-crimson-dark pointer"
                          onClick={props.onUpgradeToPlus}
                        >
                          upgrade to Edmit Plus
                        </span>
                      </span>
                    )}
                    .
                  </span>
                )}
              </Text>
            ) : (
              <Formik<{}>
                initialValues={{}}
                onSubmit={async (_, { setSubmitting }) => {
                  setSubmitting(true);
                  await props.getReport!();
                  setSubmitting(false);
                }}
                render={({ submitForm, isSubmitting }) => (
                  <>
                    <Text className="mt3 mb0 t-small tc i">
                      <span>Reminder: you can add up to 5 colleges to your report.</span>
                    </Text>
                    <div className="mt3 flex justify-center">
                      <FormSubmit
                        buttonSize={EButtonSize.Medium}
                        submitState={isSubmitting ? ESubmitState.Submitted : ESubmitState.Default}
                        defaultText={'Get Report'}
                        submittedText={'Requesting Report'}
                        succeededText={'Report Request Received'}
                        failedText={'Report Request Failed'}
                        onClick={submitForm}
                      />
                    </div>
                  </>
                )}
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CompareEditModal;
