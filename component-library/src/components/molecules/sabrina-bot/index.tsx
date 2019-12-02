import * as React from 'react';
import { Transition, animated } from 'react-spring/renderprops';
import { animateScroll as scroll, scrollSpy } from 'react-scroll';
import withSizes from 'react-sizes';
import { JSONSchema6 } from 'json-schema';

import sabrinaBw from '../../../assets/sabrina-bw.png';
import Avatar, { EAvatarSize, EAvatarTheme, EAvatarType } from '../../atoms/avatar';
import Text from '../../atoms/typography/text';
import Card from '../../atoms/card';
import { hexCrimson, hexOffwhite } from '../../atoms/colors';
import { EIconName } from '../../atoms/icon';
import Form, { IFormViewModel } from '../form';
import Button, { EButtonSize, EButtonType } from '../../atoms/button';
import EdmitTooltip, { ETooltipType } from '../tooltip';
import { doNothingFn } from '../../../shared';
import ClickAwayListener from '../../atoms/clickaway-listener';

interface ISabrinaMiniBotViewModel {
  backgroundColor?: string;
  open: boolean;
  openDelay?: string;
  children: string;

  style?: React.CSSProperties;
  className?: string;
}

type SabrinaMiniBotProps = ISabrinaMiniBotViewModel;

export const SabrinaMiniBot: React.SFC<SabrinaMiniBotProps> = props => {
  const getDelay = (delay: string) =>
    props.openDelay ? `calc(${props.openDelay} + ${delay})` : delay;

  return (
    <div className={'relative ' + props.className} style={props.style}>
      <div
        className={'ba br2 b--gray-light shadow-card'}
        style={{
          backgroundColor: props.backgroundColor || hexOffwhite,
          maxHeight: props.open ? 400 : 0,
          opacity: props.open ? 1 : 0,
          transition: `max-height 1500ms ease-in-out ${getDelay(
            '300ms'
          )}, opacity 1500ms ${getDelay('300ms')}`
        }}
      >
        <div className={'flex pa3'}>
          <div className={'flex-shrink-0'} style={{ width: 40, height: 40 }}>
            {/* AVATAR PLACEHOLDER */}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <Text
              className="ml3 mr3 lh-copy mt0 mb0"
              style={{
                opacity: props.open ? 1 : 0,
                transform: `translate3d(${props.open ? 0 : -50}%, 0, 0)`,
                transition: `transform 1500ms ${getDelay('550ms')}, opacity 1500ms ${getDelay(
                  '550ms'
                )}`
              }}
            >
              {props.children}
            </Text>
          </div>
        </div>
      </div>
      <div className={'absolute top-0 flex pa3'}>
        <div
          style={{
            transform: `scale3d(${props.open ? 1 : 0}, ${props.open ? 1 : 0}, 1)`,
            transition: `transform 400ms ${getDelay('0ms')}`
          }}
        >
          <Avatar
            type={EAvatarType.College}
            theme={EAvatarTheme.White}
            size={EAvatarSize.Medium}
            logoSrc={sabrinaBw}
          />
        </div>
      </div>
    </div>
  );
};

interface ISabrinaBotMessageViewModel {
  style?: React.CSSProperties;
  className?: string;
}

type SabrinaBotMessageProps = ISabrinaBotMessageViewModel;

export const SabrinaBotMessage: React.SFC<SabrinaBotMessageProps> = props => {
  return (
    <div
      className={'dib pa2 mv2 ba br2 b--gray-light shadow-card ' + props.className}
      style={{
        backgroundColor: hexOffwhite,
        maxWidth: '80%',
        ...props.style
      }}
    >
      <Text className="lh-title mt0 mb0">{props.children}</Text>
    </div>
  );
};

interface ISabrinaBotActionViewModel {
  selected: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface ISabrinaBotActionActions {
  onSelected?: () => void;
}

type SabrinaBotActionProps = ISabrinaBotActionViewModel & ISabrinaBotActionActions;

export const SabrinaBotAction: React.SFC<SabrinaBotActionProps> = props => {
  const selectedColor = hexCrimson;

  return (
    <div
      className={'dib pa2 mv1 ba br2 dim b--gray-light pointer ' + props.className}
      style={{
        backgroundColor: props.selected ? selectedColor : 'transparent',
        borderColor: selectedColor,
        maxWidth: '70%',
        ...props.style
      }}
      onClick={props.onSelected}
    >
      <Text
        className="lh-title mt0 mb0"
        style={{
          color: props.selected ? 'white' : selectedColor
        }}
      >
        {props.children}
      </Text>
    </div>
  );
};

export enum EMessageType {
  Text = 'text',
  Form = 'form',
  Detail = 'detail',
  CTA = 'cta'
}

export interface ISabrinaBotBaseMessage {
  id: string;
  text: string;
  date: Date;

  actions?: string[];
  selectedAction?: string;
}

export interface ISabrinaBotTextMessage extends ISabrinaBotBaseMessage {
  type: EMessageType.Text;
}

export interface ISabrinaBotFormMessage<Schema extends JSONSchema6 = JSONSchema6>
  extends ISabrinaBotBaseMessage {
  type: EMessageType.Form;
  schema: IFormViewModel<Schema>['schema'];
  uiSchema?: IFormViewModel<Schema>['uiSchema'];
}

export interface ISabrinaBotDetailMessage extends ISabrinaBotBaseMessage {
  type: EMessageType.Detail;
}

export interface ISabrinaBotCTAMessage extends ISabrinaBotBaseMessage {
  type: EMessageType.CTA;
  callToActionText: string;
  onCTAClick: () => void;
}

export type SabrinaBotMessage =
  | ISabrinaBotTextMessage
  | ISabrinaBotFormMessage
  | ISabrinaBotDetailMessage
  | ISabrinaBotCTAMessage;

interface ISabrinaBotConversationViewModel {
  messages: SabrinaBotMessage[];
  isTyping: boolean;

  style?: React.CSSProperties;
  className?: string;
}

interface ISabrinaBotConversationActions {
  onSelected?: (message: SabrinaBotMessage, action: string) => void;
}

type SabrinaBotConversationProps = ISabrinaBotConversationViewModel &
  ISabrinaBotConversationActions;

export function SabrinaBotConversation(props: SabrinaBotConversationProps) {
  return (
    <div style={props.style} className={props.className}>
      <Transition
        native
        items={props.messages.sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          }
          if (a.date < b.date) {
            return -1;
          }
          return 0;
        })}
        keys={item => item.id}
        from={{ transform: 'scale(0.5)', opacity: 0, height: 0 }}
        enter={{ transform: 'scale(1)', opacity: 1, height: 'auto' }}
        leave={{ transform: 'scale(0.5)', opacity: 0, height: 0 }}
        trail={props.messages.length !== 0 ? 200 : 0}
      >
        {message => transitionProps => (
          <animated.div key={message.id} style={transitionProps}>
            <div className={'flex justify-start'}>
              {message.type !== EMessageType.Text ? (
                <div
                  className={'dib pa2 mv2 ba br2 b--gray-light shadow-card'}
                  style={{
                    backgroundColor: hexOffwhite
                  }}
                >
                  <Text className="lh-title mt0 mb0">{message.text}</Text>
                  {message.type === EMessageType.Form ? (
                    <Card className={'mt3 mb2 mh3'}>
                      <div className={'ph3 pv1'}>
                        <Form
                          schema={message.schema}
                          uiSchema={message.uiSchema}
                          hideSubmitButton
                          onSubmit={doNothingFn}
                        />
                      </div>
                    </Card>
                  ) : message.type === EMessageType.Detail ? (
                    <Card className={'mt3 mb2 mh3'}>
                      <div className={'ph3 pv1'}>
                        <Text>Detail</Text>
                      </div>
                    </Card>
                  ) : (
                        message.type === EMessageType.CTA && (
                          <Button
                            className={'mt3 mb2 ml2'}
                            text={message.callToActionText}
                            size={EButtonSize.Large}
                            type={EButtonType.Primary}
                            onClick={message.onCTAClick}
                          />
                        )
                      )}
                </div>
              ) : (
                  <SabrinaBotMessage>{message.text}</SabrinaBotMessage>
                )}
            </div>
            {/*<Text
                type={ETextType.Caption}
                className="lh-copy mt0 mb0"
                style={{ opacity: 0.25 }}
              >{message.date.toLocaleString()}</Text>*/}
            <div>
              {message.actions &&
                message.actions.map(action => {
                  return (
                    <div
                      key={action}
                      className={'flex justify-end'}
                    // style={{ ...(message.selectedAction && message.selectedAction !== action ? {
                    //   maxHeight: 0,
                    //   opacity: 0,
                    //   overflowY: 'hidden'
                    // } : {
                    //   maxHeight: 100,
                    //   opacity: 1
                    //   }) }}
                    >
                      <SabrinaBotAction
                        selected={message.selectedAction === action}
                        onSelected={() => {
                          if (typeof window != "undefined") {
                            window.analytics.track('Sabrinabot action selected', {
                              selectedAction: action
                            });
                          }

                          if (props.onSelected && !message.selectedAction) {
                            props.onSelected(message, action);
                          }
                        }}
                      >
                        {action}
                      </SabrinaBotAction>
                    </div>
                  );
                })}
            </div>
          </animated.div>
        )}
      </Transition>
      <div
        className={'flex justify-start'}
        style={{
          maxHeight: props.isTyping ? 100 : 0,
          opacity: props.isTyping ? 1 : 0,
          overflow: 'hidden',
          transition: 'opacity 400ms, max-height 1000ms'
        }}
      >
        <SabrinaBotMessage>• • •</SabrinaBotMessage>
      </div>
    </div>
  );
}

export interface ISabrinaBotViewModel extends ISabrinaBotConversationViewModel {
  open: boolean;
  visible: boolean;
  isMobile?: boolean;

  style?: React.CSSProperties;
  className?: string;
}

export interface ISabrinaBotActions extends ISabrinaBotConversationActions {
  onSetOpened?: (open: boolean) => void;
  onClickedOutside?: () => void;
}

export type SabrinaBotProps = ISabrinaBotViewModel & ISabrinaBotActions;

/*
 setInterval(() => {
      if (this.scrollContainer && this.scrollContainer.scrollTop !== this.scrollContainer.scrollHeight) {
        this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
      }
    },1000);
 */

class SabrinaBot extends React.Component<SabrinaBotProps> {
  componentDidMount() {
    scrollSpy.update();

    setTimeout(() => {
      scroll.scrollToBottom({
        containerId: 'containerElement',
        duration: 0
      });
    }, 400);
  }

  componentDidUpdate(prevProps: SabrinaBotProps) {
    if (this.props.open !== prevProps.open) {
      scroll.scrollToBottom({
        containerId: 'containerElement',
        duration: 100,
        smooth: true
      });
    } else if (this.props.messages.length > prevProps.messages.length) {
      scroll.scrollToBottom({
        containerId: 'containerElement',
        duration: 1000,
        smooth: true
      });
    } else if (this.props.isTyping !== prevProps.isTyping) {
      scroll.scrollToBottom({
        containerId: 'containerElement',
        duration: 2000,
        smooth: true
      });
    }
  }

  render() {
    return (
      <div
        style={{
          bottom: this.props.visible ? 0 : -50,
          height: '100%',
          opacity: this.props.visible ? 1 : 0,
          transition: 'opacity 400ms, bottom 600ms cubic-bezier(.87,-.41,.19,1.44)',
          width: 450,
          ...this.props.style
        }}
        className={'relative ' + this.props.className}
      >
        <style>{`
          body {
            overflow: ${
          this.props.isMobile && this.props.open && this.props.visible ? 'hidden' : 'initial'
          };
          }

          #containerElement::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* make scrollbar transparent */
          }
        `}</style>
        <ClickAwayListener
          mouseEvent={!this.props.isMobile && 'onMouseUp'}
          onClickAway={() =>
            this.props.onClickedOutside &&
            this.props.onClickedOutside()
          }
          touchEvent={false}
        >
          <div>
            <div className={'absolute top-0 bottom-0 left-0 right-0 flex flex-column justify-end'}>

              <Card
                className={'flex flex-column'}
                style={{
                  opacity: this.props.open ? 1 : 0,
                  pointerEvents: this.props.open && this.props.visible ? 'auto' : undefined,

                  ...(this.props.isMobile
                    ? {
                      bottom: 0,
                      left: 0,
                      position: 'fixed',
                      right: 0,
                      top: 0,
                      transformOrigin: '90% 90%'
                    }
                    : {
                      marginBottom: 80,
                      transformOrigin: '90% 100%'
                    }),
                  transform: this.props.open ? 'scale(1)' : 'scale(0)',
                  transition: 'opacity 400ms, transform 400ms'
                }}
              >
                <div className={'flex flex-shrink-0 items-center pa2 bb b--gray-light shadow-card'}>
                  <Avatar
                    type={EAvatarType.College}
                    theme={EAvatarTheme.White}
                    size={EAvatarSize.Medium}
                    logoSrc={sabrinaBw}
                  />
                  <Text className={'ml2 mb0 mt0 mr0 pa0'}>Sabrina</Text>
                  <div className={'flex flex-grow-1 justify-end mr2'}>
                    <EdmitTooltip
                      type={ETooltipType.Help}
                      position={'top'}
                      text={''}
                      actionOnClick={() => {
                        if (typeof window != "undefined") {
                          window.location.hash = '#hotline-bot';
                        }

                        setTimeout(() => {
                          if (typeof window == "undefined") return
                          window.location.hash = '';
                        }, 500);
                      }}
                      actionText={'Want to talk to a human?'}
                    />
                  </div>
                </div>
                <div
                  style={{
                    overflowY: 'scroll',
                    ...(this.props.isMobile
                      ? {
                        marginBottom: 65
                      }
                      : {
                        maxHeight: 500
                      })
                  }}
                  id="containerElement"
                >
                  <SabrinaBotConversation
                    className={'pt2 pb2 ph3'}
                    style={{
                      opacity: this.props.open ? 1 : 0,
                      position: 'relative',
                      transform: this.props.open ? 'translate3d(0,0,0)' : 'translate3d(0, -50px, 0)',
                      transition: 'opacity 400ms 400ms, transform 800ms 400ms'
                    }}
                    messages={this.props.messages}
                    isTyping={this.props.isTyping}
                    onSelected={this.props.onSelected}
                  />
                </div>
              </Card>
            </div>
            <div className={`absolute bottom-0 right-0 flex justify-end mt2`}>
              <div
                className={'pointer relative'}
                style={{ pointerEvents: this.props.visible ? 'auto' : 'none' }}
                onClick={e => {
                  if (typeof window == "undefined") return;

                  if (this.props.open) {

                    window.analytics.track('Sabrinabot closed', {
                      page: window.location
                    });
                  }
                  else {
                    window.analytics.track('Sabrinabot opened', {
                      page: window.location
                    });
                  }
                  return this.props.onSetOpened && this.props.onSetOpened(!this.props.open);
                }}
              >
                <Avatar
                  style={{
                    transform: !this.props.open ? 'scale(1) rotate(0)' : 'scale(0) rotate(-45deg)',
                    transition: 'opacity 400ms, transform 400ms'
                  }}
                  type={EAvatarType.College}
                  theme={EAvatarTheme.Offwhite}
                  size={EAvatarSize.Large}
                  logoSrc={sabrinaBw} /*badge={<NotificationBadge badgeCount={3}/>}*/
                />
                <div
                  className={'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'}
                >
                  <Avatar
                    style={{
                      transform: this.props.open ? 'scale(1) rotate(0)' : 'scale(0) rotate(-45deg)',
                      transition: 'opacity 400ms, transform 400ms'
                    }}
                    type={EAvatarType.User}
                    theme={EAvatarTheme.Crimson}
                    size={!this.props.isMobile ? EAvatarSize.Large : EAvatarSize.Medium}
                    icon={EIconName.Close}
                  />
                </div>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </div>
    );
  }
}

const mapSizesToProps = (sizes: any) => ({
  isMobile: sizes.width < 640
});

export default withSizes(mapSizesToProps)(SabrinaBot) as typeof SabrinaBot;
