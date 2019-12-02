import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { FlexRowContainer, FlexItem, FlexColumnContainer } from '.';

storiesOf('layout/Grid', module)
  .add('Basic FlexColumnContainer', () => (
    <div>
      <FlexColumnContainer>
        <FlexItem className="ba pa3 mb3">
          Item 1
        </FlexItem>
        <FlexItem className="ba pa3 mb3">
          Item 2
        </FlexItem>
        <FlexItem className="ba pa3 mb3">
          Item 3
        </FlexItem>
      </FlexColumnContainer>
    </div>
  ))
  .add('Basic FlexRowContainer', () => (
    <div>
      <FlexRowContainer>
        <FlexItem className="ba pa3 mr3">
          Item 1
        </FlexItem>
        <FlexItem className="ba pa3 mr3">
          Item 2
        </FlexItem>
        <FlexItem className="ba pa3 mr3">
          Item 3
        </FlexItem>
      </FlexRowContainer>
    </div>
  ))
  .add('Nested FlexColumnContainers', () => (
    <div>
      <FlexColumnContainer>
        <FlexItem className="ba pa3 mb3">
          <FlexColumnContainer>
            <FlexItem className="ba pa3 mb3">
              Item 1
            </FlexItem>
            <FlexItem className="ba pa3 mb3">
              Item 2
            </FlexItem>
            <FlexItem className="ba pa3 mb3">
              Item 3
            </FlexItem>
          </FlexColumnContainer>
        </FlexItem>
        <FlexItem className="ba pa3 mb3">
          Item 2
        </FlexItem>
        <FlexItem className="ba pa3 mb3">
          Item 3
        </FlexItem>
      </FlexColumnContainer>
    </div>
  ))
  .add('Nested FlexRowContainers', () => (
    <div>
      <FlexRowContainer>
        <FlexItem className="ba pa3 mb3">
          <FlexRowContainer>
            <FlexItem className="ba pa3 mb3">
              Item 1
            </FlexItem>
            <FlexItem className="ba pa3 mb3">
              Item 2
            </FlexItem>
            <FlexItem className="ba pa3 mb3">
              Item 3
            </FlexItem>
          </FlexRowContainer>
        </FlexItem>
        <FlexItem className="ba pa3 mb3">
          Item 2
        </FlexItem>
        <FlexItem className="ba pa3 mb3">
          Item 3
        </FlexItem>
      </FlexRowContainer>
    </div>
  ))
  .add('Nested FlexRowContainer and FlexColumnContainer', () => (
    <div>
      <FlexColumnContainer>
        <FlexItem className="ba pa3 mb3">
          <FlexRowContainer>
            <FlexItem className="ba pa3 mb3">
              Item 1
            </FlexItem>
            <FlexItem className="ba pa3 mb3">
              Item 2
            </FlexItem>
            <FlexItem className="ba pa3 mb3">
              Item 3
            </FlexItem>
          </FlexRowContainer>
        </FlexItem>
        <FlexItem className="ba pa3 mb3">
          Item 2
        </FlexItem>
        <FlexItem className="ba pa3 mb3">
          <FlexColumnContainer>
            <FlexItem className="ba pa3 mb3">
              <FlexRowContainer>
                <FlexItem className="ba pa3 mb3">
                  Item 1
            </FlexItem>
                <FlexItem className="ba pa3 mb3">
                  Item 2
            </FlexItem>
                <FlexItem className="ba pa3 mb3">
                  Item 3
            </FlexItem>
              </FlexRowContainer>
            </FlexItem>
            <FlexItem className="ba pa3 mb3">
              Item 2
        </FlexItem>
            <FlexItem className="ba pa3 mb3">
              Item 3
        </FlexItem>
          </FlexColumnContainer>
        </FlexItem>
      </FlexColumnContainer>
    </div>
  ));