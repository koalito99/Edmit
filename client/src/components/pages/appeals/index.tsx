import * as React from 'react';
import { Formik } from 'formik';

import PageContainer from '@edmit/component-library/src/components/atoms/page-container';
import Heading, { EHeadingSize } from '@edmit/component-library/src/components/atoms/typography/heading';
import Card from '@edmit/component-library/src/components/atoms/card';
import LoadingText, { ELoadingTextSize } from '@edmit/component-library/src/components/atoms/loading/text';
import Text from '@edmit/component-library/src/components/atoms/typography/text';
import AppealsProgressTable from '@edmit/component-library/src/components/molecules/table-appeal-progress';
import withSizes from 'react-sizes';
import { ConnectedSearchCollegesProps } from '@edmit/component-library/src/components/molecules/search-colleges'

export interface IAppealsPageViewModel {
  isEdmitPlus: boolean;
  isSuperUser: boolean;

  colleges: Array<{
    id: string;
    name: string;
    awardedAidAmount: number | null;
    hasDraftLetter: boolean;
    appealResult: number | null;
    edstimate: number;
  }>;

  searchCollegesComponent: React.ComponentType<Partial<ConnectedSearchCollegesProps>>;

  isMobile?: boolean;
  loading: boolean;
}

export interface IAppealsPageActions {
  onUpgrade: () => void;
  onConsult: (collegeId: string) => void;
  onUploadFinAidLetter: (
    college: {
      edstimate: number;
      id: string;
      name: string;
    }
  ) => void;
  onSUUploadDraftAidLetter: (
    college: {
      id: string;
      name: string;
      file: File;
    }
  ) => void;
  onSetAppealAmount: (collegeId: string, appealAmount: number | null) => void;
  onRequestDraftLetterUrl: (collegeId: string) => Promise<string | null>;
}

type AppealsPageProps = IAppealsPageViewModel & IAppealsPageActions;

class AppealsPage extends React.Component<AppealsPageProps> {
  render() {
    const SearchColleges = this.props.searchCollegesComponent;

    const steps = (textClassName?: string) =>
      [
        'Upload your aid letters for the colleges in your list. Even if you aren\'t appealing, sharing all of the letters you have will help us give you the best recommendations.',
        'Schedule a consultation with an Edmit Advisor to review your options. We\'ll advise you on the likelihood of an appeal and on the best strategy.',
        'After your consultation, Edmit will send you a draft of the letter(s) you can use for your appeal(s). Your advisor will be available via email for any additional questions as you go through the process.'
      ].map((text, i) => {
        return (
          <div key={i} className={'flex'}>
            <div
              className={
                'bg-crimson white w2 h2 flex justify-center items-center flex-shrink-0 mr3 mt3'
              }
              style={{ borderRadius: 50 }}
            >
              {i + 1}
            </div>
            <Text className={'f5 lh-copy ' + textClassName}>{text}</Text>
          </div>
        );
      });

    return (
      <PageContainer>
        {this.props.loading ? (
          <span className="w-100 flex flex-row">
            <div className="dn db-l w-30-l pr5-l">
              <LoadingText size={ELoadingTextSize.H3} width={60} />
              <LoadingText size={ELoadingTextSize.H3} width={70} />
              <LoadingText size={ELoadingTextSize.H3} width={60} />
            </div>
            <div className="w-100 w-70-l">
              <div className="pt5 nt5" id="profile">
                <Card className="pa3 pa4-l">
                  <LoadingText size={ELoadingTextSize.H3} width={20} />
                  <div className="mv4">
                    <div className="flex flex-row flex-wrap nl3 nr3">
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={30} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={30} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <div className="form-field">
                          <LoadingText width={60} />
                          <LoadingText size={ELoadingTextSize.H3} width={100} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mv5">
                    <LoadingText width={20} />
                    <div className="flex flex-row flex-wrap nl3 nr3">
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                        <LoadingText width={90} />
                      </div>
                      <div className="w-100 w-50-ns pa3">
                        <LoadingText width={10} />
                        <LoadingText size={ELoadingTextSize.H3} width={100} />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </span>
        ) : (
            <div>
              <Heading
                size={EHeadingSize.H3} text={'Aid Letters'} className={"tc mb2"}
              >
              </Heading>
              {!this.props.isMobile && (
                <div className="dib v-top w-100 w-30-l pr5-l mt4-l">
                  {/*sidebar*/}
                  {steps()}
                </div>
              )}
              <Card className="dib v-top w-100 w-70-l pa3 pa4-l">
                <div className={'dib w5'}>
                  <Formik initialValues={{ query: '' }} onSubmit={() => null}>
                    {({ values, setFieldValue }) => (
                      <SearchColleges
                        inputValue={values.query}
                        onSearch={newQuery => setFieldValue('query', newQuery)}
                      />
                    )}
                  </Formik>
                </div>
                <div className="mv2 mv4-l">
                  <div className="w-100 mb3 flex flex-row flex-wrap">
                    <AppealsProgressTable
                      data={this.props.colleges}
                      isEdmitPlus={this.props.isEdmitPlus}
                      isSuperUser={this.props.isSuperUser}
                      loading={this.props.loading}
                      onScheduleConsult={() => {
                        this.props.isEdmitPlus ?
                          this.props.onConsult(this.props.colleges[0].id) :
                          this.props.onUpgrade();
                      }}
                      onUploadFinAidLetter={this.props.onUploadFinAidLetter}
                      onSetAppealAmount={this.props.onSetAppealAmount}
                      onSUUploadDraftAidLetter={this.props.onSUUploadDraftAidLetter}
                      onRequestDraftLetterUrl={this.props.onRequestDraftLetterUrl}
                    />
                  </div>
                </div>
              </Card>
            </div>
          )}
      </PageContainer>
    );
  }
}

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 640
});

export default withSizes(mapSizesToProps)(AppealsPage) as typeof AppealsPage;
