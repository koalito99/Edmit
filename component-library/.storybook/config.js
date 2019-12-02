import { configure } from '@storybook/react';

import '../src/css/tachyons.css';
import '../src/css/react-select.css';
import '../src/css/react-table.css';
import '../src/css/edmit-theme.css';
import '../src/css/edmit-components.css';

// typeof require.context === 'undefined'
if (typeof __webpack_require__ === 'undefined') {
  const fs = require('fs');
  const path = require('path');

  require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
    const files = {};

    function readDirectory(directory) {
      fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.resolve(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath);

          return;
        }

        if (!regularExpression.test(fullPath)) return;

        files[fullPath] = true;
      });
    }

    readDirectory(path.resolve(__dirname, base));

    function Module(file) {
      return require(file);
    }

    Module.keys = () => Object.keys(files);

    return Module;
  };
}

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.(js|jsx|ts|tsx)$/);
function loadStories() {
  req.keys().sort().forEach(filename => req(filename));
}

configure(loadStories, module);
