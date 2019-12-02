import * as React from 'react'
import PageContainer from '@edmit/component-library/src/components/atoms/page-container'
import EdstimatePresentation, { IEdstimatePresentationData } from '@edmit/component-library/src/components/organisms/edstimate-presentation'

type IEdstimatePageViewModel = IEdstimatePresentationData & {

}

interface IEdstimatePageActions {

}

type EdstimatePageProps = IEdstimatePageViewModel & IEdstimatePageActions;

const EdstimatePage: React.FC<EdstimatePageProps> = props => {
  return (
    <PageContainer>
      <EdstimatePresentation {...props} singleOptionOpen={false} defaultOpenOptions={["trends", "other_students", "published_scholarships"]} />
    </PageContainer>
  )
}

export default EdstimatePage