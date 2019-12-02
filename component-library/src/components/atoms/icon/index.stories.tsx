import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Icon, { EIconName } from '.';
import { FlexRowContainer, FlexItem, FlexWrappingContainer } from '../../layout';
import { withLightGreyBackground, withWhiteBackground, withLato } from '../../../lib/colors';

storiesOf('atoms/Icons', module)
    .add('All', () => {
        const keys = Object.keys(EIconName).filter(k => typeof EIconName[k as any] === "string"); // ["A", "B"]
        const icons = keys.map(k => EIconName[k as any]); // [0, 1]

        return (
            <FlexWrappingContainer style={{ ...withLato, ...withLightGreyBackground }}>
                {
                    icons.sort().map(icon => (
                        <FlexItem className="pa2 w-third">
                            <div className="pa3 f3" style={{ ...withWhiteBackground }}>
                                <FlexRowContainer>
                                    <FlexItem className="mr3">
                                        <Icon name={icon as EIconName} />
                                    </FlexItem>
                                    <FlexItem>{icon}</FlexItem>
                                </FlexRowContainer>
                            </div>
                        </FlexItem>
                    ))
                }
            </FlexWrappingContainer>
        )
    })
    .add('Animated', () => (
        <div>
            <Icon name={EIconName.Loading} className="crimson icon-large icon-animated-loading" />
        </div>
    ));