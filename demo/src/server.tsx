import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { App } from './components/App.isoentry';
import fs from 'fs';

const server = express();
const html = fs.readFileSync(__dirname + '/layout.html', { encoding: 'utf-8' });

server.use(express.static('public'));

server.get('/', (req, res) => {
  const body = renderToString(<App />);
  res.send(html.replace('{{placeholder}}', body));
});

server.listen(3000, () => console.log('Example app listening on port 3000!'));
