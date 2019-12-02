import * as React from 'react';
import { storiesOf } from '@storybook/react';
import SabrinaBot, {
    EMessageType,
    SabrinaBotConversation,
    SabrinaMiniBot
} from '.';
import Card from '../../atoms/card';

storiesOf('molecules/Sabrina Bot', module)
    .add('Mini', () => (
        <SabrinaMiniBot open={true} style={{ margin: 30, width: 350 }}>
            Hi, I’m Sabrina. I’m one of Edmit’s cofounders and I manage our advising. To get started,
            we’ll ask you some questions so we can personalize our pricing and recommendations for you.
    </SabrinaMiniBot>
    ))
    .add('Conversation', () => (
        <div className={'flex flex-wrap'}>
            <Card style={{ maxWidth: 450, maxHeight: 400, overflowY: 'scroll', margin: 10, padding: 20 }}>
                <SabrinaBotConversation
                    messages={[
                        {
                            actions: [
                                `I need help finding new colleges`,
                                `I want to figure out which college is best for me in my list`
                            ],
                            date: new Date(1000 * 3600 * 2),
                            id: '0',
                            selectedAction: `I need help finding new colleges`,
                            text: 'Hello, how may I help you today?',
                            type: EMessageType.Text as EMessageType.Text
                        },
                        {
                            date: new Date(1000 * 3600 * 3),
                            id: '1',
                            text: 'With Edmit you get the best personalized college recommendations, guaranteed.',
                            type: EMessageType.Text as EMessageType.Text
                        },
                        {
                            date: new Date(1000 * 3600 * 4),
                            id: '2',
                            text:
                                'We are now on the My Colleges page, where you can select new colleges and add them to your list.',
                            type: EMessageType.Text as EMessageType.Text
                        },
                        {
                            actions: [`Sure`, `No thanks - I can find them myself`],
                            date: new Date(1000 * 3600 * 4.5),
                            id: '3',
                            text: 'May I suggest a college for you to add?',
                            type: EMessageType.Text as EMessageType.Text
                        }
                    ]}
                    isTyping
                />
            </Card>
            <Card style={{ maxWidth: 450, maxHeight: 400, overflowY: 'scroll', margin: 10, padding: 20 }}>
                <SabrinaBotConversation
                    messages={[
                        {
                            date: new Date(1000 * 3600 * 4),
                            id: '0',
                            text:
                                'We are now on the My Colleges page, where you can select new colleges and add them to your list.',
                            type: EMessageType.Text as EMessageType.Text
                        },
                        {
                            actions: [`Sure`, `No thanks - I can find them myself`],
                            date: new Date(1000 * 3600 * 4.5),
                            id: '1',
                            selectedAction: `Sure`,
                            text: 'May I suggest a college for you to add?',
                            type: EMessageType.Text as EMessageType.Text
                        },
                        {
                            actions: [`Add`, `Next`, 'No more suggestions'],
                            date: new Date(1000 * 3600 * 5),
                            id: '2',
                            selectedAction: `Add`,
                            text: 'How about this one?',
                            type: EMessageType.Detail as EMessageType.Detail
                        },
                        {
                            callToActionText: "Let's go!",
                            date: new Date(1000 * 3600 * 5.5),
                            id: '3',
                            onCTAClick: () => null,
                            text: 'Would you like to go to Compare?',
                            type: EMessageType.CTA as EMessageType.CTA
                        }
                    ]}
                    isTyping={false}
                />
            </Card>
            <Card style={{ maxWidth: 450, maxHeight: 400, overflowY: 'scroll', margin: 10, padding: 20 }}>
                <SabrinaBotConversation
                    messages={[
                        {
                            actions: [`Submit`, `Nah`],
                            date: new Date(1000 * 3600 * 2),
                            id: '0',
                            schema: {
                                properties: {
                                    gpa: { type: 'string', title: 'GPA' },
                                    gpaWeighted: { type: 'boolean', title: 'Weighted?', default: false }
                                },
                                required: ['gpa'],
                                type: 'object'
                            },
                            text: 'We need your GPA to get cool with your schools.',
                            type: EMessageType.Form as EMessageType.Form,
                            uiSchema: {
                                'ui:order': ['gpa', 'gpaWeighted', '*']
                            }
                        }
                    ]}
                    isTyping={false}
                />
            </Card>
        </div>
    ))
    .add('Default', () => (
        <div className={'flex flex-wrap'}>
            <SabrinaBot
                className={'pa3'}
                open={true}
                visible={true}
                messages={[
                    {
                        actions: [
                            `I need help finding new colleges`,
                            `I want to figure out which college is best for me in my list`
                        ],
                        date: new Date(1000 * 3600 * 2),
                        id: '0',
                        selectedAction: `I need help finding new colleges`,
                        text: 'Hello, how may I help you today?',
                        type: EMessageType.Text as EMessageType.Text
                    },
                    {
                        date: new Date(1000 * 3600 * 3),
                        id: '1',
                        text: 'With Edmit you get the best personalized college recommendations, guaranteed.',
                        type: EMessageType.Text as EMessageType.Text
                    },
                    {
                        date: new Date(1000 * 3600 * 4),
                        id: '2',
                        text:
                            'We are now on the My Colleges page, where you can select new colleges and add them to your list.',
                        type: EMessageType.Text as EMessageType.Text
                    },
                    {
                        actions: [`Sure`, `No thanks - I can find them myself`],
                        date: new Date(1000 * 3600 * 4.5),
                        id: '3',
                        text: 'May I suggest a college for you to add?',
                        type: EMessageType.Text as EMessageType.Text
                    }
                ]}
                isTyping
            />
            <SabrinaBot
                className={'pa3'}
                open={false}
                visible={true}
                messages={[
                    {
                        date: new Date(1000 * 3600 * 4),
                        id: '0',
                        text:
                            'We are now on the My Colleges page, where you can select new colleges and add them to your list.',
                        type: EMessageType.Text as EMessageType.Text
                    },
                    {
                        actions: [`Sure`, `No thanks - I can find them myself`],
                        date: new Date(1000 * 3600 * 4.5),
                        id: '1',
                        selectedAction: `Sure`,
                        text: 'May I suggest a college for you to add?',
                        type: EMessageType.Text as EMessageType.Text
                    },
                    {
                        actions: [`Add`, `Next`, 'No more suggestions'],
                        date: new Date(1000 * 3600 * 5),
                        id: '2',
                        selectedAction: `Add`,
                        text: 'How about this one?',
                        type: EMessageType.Detail as EMessageType.Detail
                    },
                    {
                        actions: [`Add`, `Next`, 'No more suggestions'],
                        date: new Date(1000 * 3600 * 5),
                        id: '2',
                        selectedAction: `Add`,
                        text: 'How about this one?',
                        type: EMessageType.Detail as EMessageType.Detail
                    }
                ]}
                isTyping={false}
            />
        </div>
    ));