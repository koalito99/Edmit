/* tslint:disable:no-var-requires */
import * as path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
const { imageSnapshot } = require('@storybook/addon-storyshots-puppeteer');

initStoryshots({
  suite: 'Image storyshots',
  test: imageSnapshot({ storybookUrl: `file://${path.join(__dirname, '../../storybook-static')}` })
});