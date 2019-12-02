import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '../../molecules/form';
import { EButtonSize } from '../button';
import FormSubmit, { ESubmitState } from './form-submit';
import FormFieldText from './form-field-text';
import FormFieldEmail from './form-field-email';
import FormFieldPassword from './form-field-password';
import FormFieldNumber from './form-field-number';
import FormFieldCurrency from './form-field-currency';
import FormFieldSelect from './form-field-select';
import FormFieldFile from './form-field-file';
import FormFieldToggle from './form-field-toggle';
import Card from '../card';


storiesOf('atoms/Forms', module)
    .add('Fields', () => (
        <div>
            <FormFieldText
                name={'form-field'}
                label={'Form Field Text'}
                value={''}
                placeholder={'Placeholder text'}
                required={false}
            />
            <FormFieldEmail
                name={'form-field'}
                label={'Form Field Email'}
                value={''}
                placeholder={'Placeholder text'}
                required={false}
            />
            <FormFieldPassword
                name={'form-field'}
                label={'Form Field Password'}
                value={''}
                placeholder={'Placeholder text'}
                required={false}
            />
            <FormFieldNumber
                name={'form-field'}
                label={'Form Field Number'}
                value={0}
                placeholder={0}
                required={false}
            />
            <FormFieldCurrency
                name={'form-field'}
                label={'Form Field Currency'}
                value={0}
                placeholder={0}
                required={false}
                errorMessage={'Error message'}
            />
            <FormFieldSelect name={'form-field'} label={'Form Field Select'} required={false}>
                <option />
                <option value={'option-1'}>Option 1</option>
            </FormFieldSelect>
            <FormFieldFile name={'form-field'} label={'Form Field File'} value={null} />
            <FormFieldToggle
                name={'form-field'}
                label={'Form Field Toggle'}
                checked={true}
                optionLeftLabel={'Left'}
                optionRightLabel={'Right'}
            />
        </div>
    ))
    .add('Submit', () => (
        <div>
            <FormSubmit
                buttonSize={EButtonSize.Medium}
                submitState={ESubmitState.Default}
                defaultText={'Default'}
                submittedText={'Submitted'}
                succeededText={'Succeeded'}
                failedText={'Failed'}
            />
            <FormSubmit
                buttonSize={EButtonSize.Medium}
                submitState={ESubmitState.Submitted}
                defaultText={'Default'}
                submittedText={'Submitted'}
                succeededText={'Succeeded'}
                failedText={'Failed'}
            />
            <FormSubmit
                buttonSize={EButtonSize.Medium}
                submitState={ESubmitState.Succeeded}
                defaultText={'Default'}
                submittedText={'Submitted'}
                succeededText={'Succeeded'}
                failedText={'Failed'}
            />
            <FormSubmit
                buttonSize={EButtonSize.Medium}
                submitState={ESubmitState.Failed}
                defaultText={'Default'}
                submittedText={'Submitted'}
                succeededText={'Succeeded'}
                failedText={'Failed'}
            />
        </div>
    ))
    .add('Generated Forms', () => (
        <div className={'flex flex-wrap'}>
            <Card className={'pa3 ma3'} style={{ width: 350, maxHeight: 450, overflowY: 'scroll' }}>
                <Form
                    schema={{
                        properties: {
                            done: { type: 'boolean', title: 'Done?', default: false },
                            hhi: { type: 'number', title: 'Household Income' },
                            password: { type: 'string', title: 'Password' },
                            testScores: {
                                properties: {
                                    act: { type: 'number', title: 'ACT Score' },
                                    gpa: { type: 'string', title: 'GPA' },
                                    gpaWeighted: { type: 'boolean', title: 'Weighted?', default: false },
                                    psat: { type: 'number', title: 'PSAT Score' },
                                    sat: { type: 'number', title: 'SAT Score' }
                                },
                                required: ['gpa'],
                                title: 'Test Scores',
                                type: 'object'
                            },
                            title: { type: 'string', title: 'Title', default: 'A new task' }
                        },
                        required: ['title'],
                        // title: "Todo",
                        type: 'object'
                    }}
                    uiSchema={{
                        hhi: {
                            'ui:widget': 'currency'
                        },
                        password: {
                            'ui:widget': 'password'
                        },
                        testScores: {
                            sat: {
                                'ui:widget': 'updown'
                            },
                            'ui:order': ['gpa', 'gpaWeighted', 'sat', 'act', 'psat', '*']
                        },
                        'ui:order': ['done', 'title', 'password', 'testScores', 'hhi', '*']
                    }}
                    onSubmit={values => {
                        // yeah
                    }}
                />
            </Card>
            <Card className={'pa3 ma3'} style={{ width: 350, maxHeight: 450, overflowY: 'scroll' }}>
                <Form
                    schema={{
                        properties: {
                            colleges: {
                                items: {
                                    properties: {
                                        description: {
                                            type: 'string'
                                        },
                                        zap: {
                                            type: 'string'
                                        }
                                    },
                                    title: 'College',
                                    type: 'object'
                                },
                                title: 'Colleges',
                                type: 'array'
                            },
                            done: { type: 'boolean', title: 'Done?', default: false },
                            stage: {
                                enum: ['Exploring', 'Applied', 'Deciding', 'Negotiating', 'Paying'],
                                title: 'Stage',
                                type: 'string'
                            },
                            title: {
                                type: 'string'
                            }
                        },
                        required: ['title'],
                        title: 'Todo',
                        type: 'object'
                    }}
                    uiSchema={{
                        done: {
                            'ui:widget': 'toggle'
                        },
                        'ui:order': ['done', '*']
                    }}
                    onSubmit={values => {
                        console.log(values.title.toLowerCase());
                        console.log(values.colleges[0].description);
                    }}
                />
            </Card>
            {/*<Card className={"pa3 ma3"} style={{width: 350, maxHeight: 450, overflowY: 'scroll'}}>
        <Form
          schema={{
            properties: {
              recSets: {
                items: {
                  items: {
                    properties: {
                      collegeId: { type: "string", title: "College" },
                      name: { type: "string", title: "Name" }
                    },
                    title: "Recommendation",
                    type: "object"
                  },
                  title: "Recommendations",
                  type: "array"
                },
                title: "Recommendation Sets",
                type: "array",
              }
            },
            title: "Todo",
            type: "object"
          }}
          onSubmit={values => {
          console.log(values.recSets[0][0].collegeId);
        }}/>
      </Card>*/}
        </div>
    ));
