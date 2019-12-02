import * as React from 'react';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';

import AppealsPage from '../../../components/pages/appeals';
import ConnectedSearchColleges from '../../molecules/search-colleges';
import {
  AddToMyColleges,
  AddToMyCollegesVariables,
  GetFileDownloadUrl,
  GetFileDownloadUrlVariables,
  GetAppeals,
  GetAppealsVariables,
  UpdateFinancialAidAppeal,
  UpdateFinancialAidAppealVariables
} from '../../../graphql/generated';
import { GET_FILE_DOWNLOAD_URL, GET_APPEALS } from '../../../graphql/queries';
import {
  ADD_TO_MY_COLLEGES,
  UPDATE_FINANCIAL_AID_APPEAL
} from '../../../graphql/mutations';
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { normalizeId } from "@edmit/component-library/src/lib/models";
import { usePaywall } from "../../../hooks/paywall";
import { EDMIT_PLUS_ANNUAL_PRODUCT_ID } from '@edmit/component-library/src/lib/payment';
import { studentQueryProperties } from '../../../lib/graphql'

export interface IConnectedAppealsPageViewModel {
  upgradeModalOpen: boolean;
}

export interface IConnectedAppealsPageActions {
  onConsult: (collegeId: string) => void;
  onUploadFinAidLetter: (college: { edstimate: number; id: string; name: string }) => void;
}

type ConnectedAppealsPageProps = IConnectedAppealsPageViewModel & IConnectedAppealsPageActions;

const ConnectedAppealsPage: React.SFC<ConnectedAppealsPageProps> = props => {
  const { studentId } = useStudentSwitcher();
  const { openPlanSelectionModal, setSelectedProductId } = usePaywall();

  return (
    <ApolloConsumer>
      {apolloClient => (
        <Query<GetAppeals, GetAppealsVariables>
          query={GET_APPEALS}
          {...studentQueryProperties(studentId)({})}
        >
          {appealsPageQuery => (
            <Mutation<AddToMyColleges, AddToMyCollegesVariables> mutation={ADD_TO_MY_COLLEGES}>
              {addToMyColleges => (
                <Mutation<UpdateFinancialAidAppeal, UpdateFinancialAidAppealVariables>
                  mutation={UPDATE_FINANCIAL_AID_APPEAL}
                >
                  {updateFinancialAidAppeal => (
                    <AppealsPage
                      colleges={
                        appealsPageQuery.data && appealsPageQuery.data.student
                          ? appealsPageQuery.data.student.colleges
                            .map(college => ({
                              appealResult: college.financialAidAppealAward,
                              awardedAidAmount: college.financialAidAward,
                              edstimate: college.edstimate.value,
                              hasDraftLetter: Boolean(college.financialAidAppealLetter),
                              id: college.id,
                              name: college.name
                            }))
                          : []
                      }
                      searchCollegesComponent={searchProps => (
                        <ConnectedSearchColleges
                          myColleges={
                            appealsPageQuery.data && appealsPageQuery.data.student
                              ? appealsPageQuery.data.student.colleges.map(college => ({
                                id: college.id
                              }))
                              : []
                          }
                          onSearch={() => null}
                          inputValue={''}
                          onSelected={async selected => {
                            const collegeId = selected.id;

                            await addToMyColleges(
                              studentQueryProperties(studentId)({
                                collegesWhere: [{ id: collegeId }]
                              })
                            );

                            window.analytics.track('add_college', {
                              collegeId,
                              from: 'Appeals',
                              studentId
                            });

                            appealsPageQuery.refetch();
                          }}
                          {...searchProps}
                        />
                      )}
                      isEdmitPlus={
                        (appealsPageQuery.data &&
                          appealsPageQuery.data.student &&
                          appealsPageQuery.data.student.appliedProducts.length > 0) ||
                        false
                      }
                      isSuperUser={
                        (appealsPageQuery.data &&
                          appealsPageQuery.data.session &&
                          appealsPageQuery.data.session.account.isSuperUser) ||
                        false
                      }
                      loading={appealsPageQuery.loading || appealsPageQuery.data == null}
                      onUpgrade={() => {
                        setSelectedProductId(normalizeId(EDMIT_PLUS_ANNUAL_PRODUCT_ID));
                        openPlanSelectionModal('to Edmit Plus');
                      }}
                      onConsult={() =>
                        (window.location.href =
                          'https://calendly.com/edmit-advising/edmit-consultation')
                      }
                      onUploadFinAidLetter={props.onUploadFinAidLetter}
                      onSetAppealAmount={(collegeId, appealAmount) => {
                        updateFinancialAidAppeal(
                          studentQueryProperties(studentId)(
                            {
                              collegeId,
                              input: { appealAidAward: { value: appealAmount } },
                              studentId
                            }
                          )
                        );
                      }}
                      onSUUploadDraftAidLetter={async ({ id, name, file }) => {
                        const draftLetterDataURL = await new Promise<string>(
                          (resolve, reject) => {
                            // read data uri
                            const reader = new FileReader();

                            reader.addEventListener(
                              'load',
                              async () => {
                                resolve(reader.result as string);
                              },
                              false
                            );

                            reader.readAsDataURL(file);
                          }
                        );

                        await updateFinancialAidAppeal(
                          studentQueryProperties(studentId)({
                            collegeId: id,
                            input: {
                              appealLetter: draftLetterDataURL
                                ? {
                                  dataUrl: draftLetterDataURL,
                                  name: file.name
                                }
                                : null
                            }
                          })
                        );

                        window.analytics.track('Uploaded Draft Financial Aid Appeal Letter', {
                          collegeId: id,
                          draftLetter: draftLetterDataURL
                            ? {
                              dataUrl: draftLetterDataURL,
                              name: file.name
                            }
                            : null
                        });
                      }}
                      onRequestDraftLetterUrl={async collegeId => {
                        const fileId = appealsPageQuery.data!.student.colleges.find(
                          college => college.id === collegeId
                        )!.financialAidAppealLetter!.id;

                        const queryResult = await apolloClient.query<
                          GetFileDownloadUrl,
                          GetFileDownloadUrlVariables
                        >({
                          query: GET_FILE_DOWNLOAD_URL,
                          ...studentQueryProperties(studentId)({ fileId })
                        });

                        return queryResult.data && queryResult.data.file.downloadUrl;
                      }}
                    />
                  )
                  }
                </Mutation>
              )}
            </Mutation>
          )}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default ConnectedAppealsPage;
