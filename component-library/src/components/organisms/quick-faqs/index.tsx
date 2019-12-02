import * as React from 'react';
import Card from '../../atoms/card';
import { ExpansionGroup } from "../../atoms/expansion-group";
import Text, { ETextType } from '../../atoms/typography/text';
import Icon, { EIconName } from '../../atoms/icon';
import { hexGrayLight } from '../../atoms/colors';

export interface IQuickAnswerCardViewModel {
  title: string;
  maxHeight?: number;

  open: boolean;
  disabled?: boolean;
  disabledContent?: JSX.Element;

  style?: React.CSSProperties;
  className?: string;
}

export interface IQuickAnswerCardActions {
  onOpen: (opened: boolean) => void;
}

type QuickAnswerCardProps = IQuickAnswerCardViewModel & IQuickAnswerCardActions;

export const QuickAnswerCard: React.SFC<QuickAnswerCardProps> = props => {
  return (
    <div className={'relative ' + props.className} style={props.style}>
      <Card className={`pv1 ph3`} style={{ opacity: !props.disabled ? 1 : 0.5 }}>
        <div
          className={'pointer flex justify-between items-center'}
          onClick={() => props.onOpen(!props.open)}
        >
          <Text type={ETextType.Label}>{props.title}</Text>
          <Icon name={props.open ? EIconName.ChevronUp : EIconName.ChevronDown} />
        </div>
        <div
          style={{
            maxHeight: props.open ? props.maxHeight || 400 : 0,
            opacity: props.open ? 1 : 0,
            overflowY: 'hidden',
            transition: 'max-height 400ms, opacity 400ms'
          }}
        >
          <div className={'mt3'}>{props.children}</div>
        </div>
      </Card>
      <div
        className={'absolute top-0 bottom-0 left-0 right-0'}
        style={{
          backgroundColor: hexGrayLight,
          opacity: 0.2,
          visibility: !props.disabled ? 'hidden' : 'visible'
        }}
      >
        {props.disabledContent}
      </div>
    </div>
  );
};


type FastAnswerKey = string;

interface IQuickFAQ {
  question: string;
  answer: string;
  link: string;
}

export interface IQuickFaqsViewModel {
  loading: boolean;
  hiddenFastAnswers: FastAnswerKey[];
  disabledFastAnswers: Array<FastAnswerKey | { key: FastAnswerKey; content: JSX.Element }>;
  content: IQuickFAQ[];
  style?: React.CSSProperties;
  className?: string;
}


type QuickFaqsProps = IQuickFaqsViewModel;

const AskEdmit: React.SFC<QuickFaqsProps> = props => {

  const isDisabled = (key: FastAnswerKey) =>
    props.disabledFastAnswers.some(el => el === key || (el as any).key === key);
  const disabledContent = (key: FastAnswerKey) => {
    const answer = props.disabledFastAnswers.some(el => (el as any).key === key);
    return answer ? (answer as any).content : null;
  };

  return (
    <ExpansionGroup single style={props.style} className={props.className}>
      {({ expandedIds, setExpanded }) => (
        <>
          {props.content.map(
            (content, index) => {
              return (
                <QuickAnswerCard
                  key={String(index)}
                  title={content.question}
                  className={'mv2'}
                  open={expandedIds.indexOf(String(index)) > -1}
                  disabled={isDisabled(String(index))}
                  disabledContent={disabledContent(String(index))}
                  onOpen={open => setExpanded(String(index), open)}
                >
                  <Text>{content.answer}</Text>
                  <div className={"flex justify-end mv2"}>
                    <a className={'no-underline fw7 crimson hover-crimson-dark pointer'}
                        target="_blank" href={content.link}>Learn more</a>
                  </div>
                </QuickAnswerCard>
              )
            }
          )}
        </>
      )}
    </ExpansionGroup>
  );
};

export default AskEdmit;
