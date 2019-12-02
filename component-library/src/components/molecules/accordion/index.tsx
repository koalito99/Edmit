import * as React from "react";

import Card from "../../atoms/card";
import Text, {ETextType} from "../../atoms/typography/text";
import Icon, {EIconName} from "../../atoms/icon";
import {hexGrayLight} from "../../atoms/colors";
import {ExpansionGroup} from "../../atoms/expansion-group";

export interface IAccordionOptionViewModel {
  title: React.ReactChild;
  maxHeight?: number | null;

  open: boolean;
  disabled?: boolean;
  disabledContent?: React.ReactChild;

  style?: React.CSSProperties;
  className?: string;
}

export interface IAccordionOptionActions {
  onOpen: (opened: boolean) => void;
}

type AccordionOptionProps = IAccordionOptionViewModel & IAccordionOptionActions;

export const AccordionOption: React.SFC<AccordionOptionProps> = props => {
  return (
    <div className={'relative ' + props.className} style={props.style}>
      <Card className={`pv2 ph3`} style={{ opacity: !props.disabled ? 1 : 0.5 }}>
        <div
          className={'pointer flex justify-between items-center'}
          onClick={() => props.onOpen(!props.open)}
        >
          <Text type={ETextType.Label} className={'w-100 pr2'}>{props.title}</Text>
          <Icon name={props.open ? EIconName.ChevronUp : EIconName.ChevronDown} />
        </div>
        <div
          style={{
            maxHeight: props.open ? (props.maxHeight === undefined ? 400 : props.maxHeight === null ? undefined : props.maxHeight) : 0,
            opacity: props.open ? 1 : 0,
            overflowY: !props.open ? 'hidden' : 'scroll',
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


interface IAccordionViewModel {
  single?: boolean;
  initialExpandedIds?: string[];

  options: Array<{
    id: string;
    title: React.ReactChild;
    content: React.ReactChild;
    disabled?: boolean;
    disabledContent?: React.ReactChild;
    maxHeight?: number | null;
  } | null>

  optionMaxHeight?: number | null;

  style?: React.CSSProperties;
  className?: string;
}

type AccordionProps = IAccordionViewModel;

const Accordion: React.SFC<AccordionProps> = props => {
  return (
    <div style={props.style} className={props.className}>
      <ExpansionGroup single={props.single} initialExpandedIds={props.initialExpandedIds}>
        {({ expandedIds, setExpanded }) => (
          <>
            { props.options.map(option => option &&
              <AccordionOption
                key={option.id}
                title={option.title}
                className={'mv2'}
                open={expandedIds.indexOf(option.id) > -1}
                onOpen={open => setExpanded(option.id, open)}
                disabled={option.disabled}
                disabledContent={option.disabledContent}
                maxHeight={option.maxHeight !== undefined ? option.maxHeight : props.optionMaxHeight}
              >
                {option.content}
              </AccordionOption>
            ) }
          </>
        )}
      </ExpansionGroup>
    </div>);
};

export default Accordion;