import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './components/App.isoentry';
import fs from 'fs';

// @ts-ignore
global.window = {
  _elephizeIsServer: true
};

const html = fs.readFileSync(__dirname + '/layout.html', { encoding: 'utf-8' });
const body = renderToString(<App />);
console.log(html.replace('{{placeholder}}', body));
