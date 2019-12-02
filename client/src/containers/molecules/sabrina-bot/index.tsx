import * as React from 'react';
import { Mutation } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { withSizes } from 'react-sizes';

import SabrinaBot, {
  EMessageType,
  ISabrinaBotBaseMessage
} from '@edmit/component-library/src/components/molecules/sabrina-bot';
import {
  GetSabrinaBotMessages,
  GetSabrinaBotMessagesVariables,
  SelectSabrinaBotMessageAction,
  SelectSabrinaBotMessageActionVariables
} from '../../../graphql/generated';
import { GET_SABRINA_BOT_MESSAGES } from '../../../graphql/queries';
import { SELECT_SABRINA_BOT_MESSAGE_ACTION } from '../../../graphql/mutations';
import actions from './actions';
import { sabrinabotViewModel } from './selector';
import { EPurchaseProduct } from '@edmit/component-library/src/lib/payment';
import { useStudentSwitcher } from '../../../hooks/student-switcher';
import { Nullable, StudentId } from '@edmit/component-library/src/lib/models';
import { studentQueryProperties } from '../../../lib/graphql'

export interface IContainedSabrinaBotViewModel {
  open: boolean;

  style?: React.CSSProperties;
  className?: string;
}

export type IContainedSabrinaBotActions = typeof actions;

interface IContainedSabrinaBotOwnProps {
  studentId: Nullable<StudentId>;
  isMobile?: boolean;
}

interface IMobileProps {
  isMobile?: boolean;
}

type ContainedSabrinaBotProps = IContainedSabrinaBotOwnProps &
  IContainedSabrinaBotViewModel &
  IContainedSabrinaBotActions &
  RouteComponentProps<{}>;

const ContainedSabrinaBot: React.FC<ContainedSabrinaBotProps> = props => {
  const [clickedOutsideCount, setClickedOutsideCount] = React.useState(0);
  const [messageCount, setMessageCount] = React.useState(0);
  const [everOpened, setEverOpened] = React.useState(false);

  React.useEffect(() => {
    // set ever opened to true to minimize sabrinabot by default
    setEverOpened(true);
    setClickedOutsideCount(0);
  }, [props.location.pathname]);

  const getSabrinaBotMessagesQuery = useQuery<
    GetSabrinaBotMessages,
    GetSabrinaBotMessagesVariables
  >(
    GET_SABRINA_BOT_MESSAGES,
    { ...studentQueryProperties(props.studentId)({ page: props.location.pathname }) }
  );

  return (
    <Mutation<SelectSabrinaBotMessageAction, SelectSabrinaBotMessageActionVariables>
      mutation={SELECT_SABRINA_BOT_MESSAGE_ACTION}
    >
      {(selectSabrinaBotMessageAction, selectSabrinaBotMessageActionInfo) => {
        if (getSabrinaBotMessagesQuery.loading || getSabrinaBotMessagesQuery.data == null || getSabrinaBotMessagesQuery.data.student == null) {
          return (
            <SabrinaBot
              open={props.open}
              visible={false}
              onSetOpened={props.setSabrinaBotOpened}
              onClickedOutside={() => {
                setClickedOutsideCount(count => count + 1);
              }}
              messages={[]}
              isTyping={false}
              onSelected={() => null}
              style={props.style}
              className={props.className}
            />
          );
        }

        if (
          getSabrinaBotMessagesQuery.data!.student.sabrinaBotMessages &&
          getSabrinaBotMessagesQuery.data!.student.sabrinaBotMessages!.length !== messageCount
        ) {
          setMessageCount(getSabrinaBotMessagesQuery.data!.student.sabrinaBotMessages!.length);

          setTimeout(() => {
            if (!props.open && !everOpened && clickedOutsideCount <= 1) {
              props.setSabrinaBotOpened(true);
              setEverOpened(true);
            }
          }, 5000);
        }

        return (
          <SabrinaBot
            open={props.open}
            visible={getSabrinaBotMessagesQuery.data!.student.sabrinaBotMessages!.length !== 0}
            onSetOpened={props.setSabrinaBotOpened}
            onClickedOutside={() => {
              setClickedOutsideCount(count => count + 1);
              if (props.open) { props.setSabrinaBotOpened(false); }
            }}
            messages={
              getSabrinaBotMessagesQuery.data!.student.sabrinaBotMessages
                ? getSabrinaBotMessagesQuery.data!.student.sabrinaBotMessages!.map(message => {
                  const baseProperties: ISabrinaBotBaseMessage = {
                    actions: message.actions || undefined,
                    date: message.createdAt,
                    id: message.id,
                    selectedAction: message.selectedAction || undefined,
                    text: message.text
                  };

                  if (message.__typename === 'SabrinaBotCTAMessage' && message.callToActionUrl) {
                    return {
                      ...baseProperties,
                      callToActionText: message.callToActionText,
                      onCTAClick: () => {
                        const ctaURL = message.callToActionUrl!;
                        window.analytics.track('Sabrinabot CTA URL clicked', {
                          studentId: props.studentId,
                          URLClicked: ctaURL
                        });

                        if (ctaURL === '/pricing') {
                          props.showPurchaseModal({
                            payments: [EPurchaseProduct.PLUS_ANNUAL],
                            task: null
                          });
                        }
                        else if (!ctaURL.startsWith("#hotline") && ctaURL.startsWith("#")) {
                          const section = window.document.getElementById(ctaURL.substring(1))
                          if (section != null) {
                            const top = section.offsetTop;
                            window.scrollTo(0, top);
                          }
                          if (props.isMobile) {
                            props.setSabrinaBotOpened(false);
                          }
                          selectSabrinaBotMessageAction(
                            studentQueryProperties(props.studentId)({
                              action: message.callToActionText,
                              messageId: message.id,
                              url: props.location.pathname
                            }));
                        } else {
                          window.location.href = ctaURL;
                        }
                      },
                      type: EMessageType.CTA as EMessageType.CTA
                    };
                  } else {
                    return {
                      ...baseProperties,
                      type: EMessageType.Text as EMessageType.Text
                    };
                  }
                })
                : []
            }
            isTyping={selectSabrinaBotMessageActionInfo.loading}
            onSelected={(message, action) => {
              selectSabrinaBotMessageAction(
                studentQueryProperties(props.studentId)({
                  action,
                  messageId: message.id,
                  url: props.location.pathname
                })
              );

              if (
                message.text === "How's it going so far? Anything else that I can help with?" &&
                action === 'Not right now'
              ) {
                props.setSabrinaBotOpened(false);
              }
            }}
            style={props.style}
            className={props.className}
          />
        );
      }}
    </Mutation>
  );
};

const ConnectedContainedSabrinaBot = withRouter(connect(
  sabrinabotViewModel,
  dispatch => bindActionCreators(actions, dispatch)
)(ContainedSabrinaBot));

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 640
})

const SabrinaBotWithStudentId: React.SFC<IMobileProps> = props => {
  const { studentId } = useStudentSwitcher();

  return <ConnectedContainedSabrinaBot studentId={studentId} isMobile={props.isMobile} />;
};

export default withSizes(mapSizesToProps)(SabrinaBotWithStudentId) as typeof SabrinaBotWithStudentId;
